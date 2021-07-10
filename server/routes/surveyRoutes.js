const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        var someHTML = '<div style="text-align:center;"><h1>Thank You for Your Response</h1><h3>Your response helps us to do better, so stay tuned!</h3></div>';
        res.set('Content-Type', 'text/html');
        res.send(someHTML);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        
        const events = _.chain(req.body)
            .map(({email, url}) => {
                const match = p.test(new URL(url).pathname); // if either surveyId or choice is missing, this will be null
                if (match) {
                    return {email, surveyId: match.surveyId, choice: match.choice}
                }
            })
            
            // remove any null
            .compact() 

            // only get unique email and survey id, in case user click multiple times quickly
            .uniqBy('email', 'surveyId')

            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email: email, responded: false}
                    } //get right survey and recipient
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })

            .value()
        
        console.log(events);
        res.send({});
    });
    
    app.post('/api/surveys', requireLogin, requireCredit, async (req,res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey ({
            title,
            subject,
            body,
            //split by comma, trim any trailing and leading spaces, map to object
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err){
            res.status(422).send(err);
        }
        
    });

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
        .select()
        //.select({ recipients: false}); //dont get recipients

        res.send(surveys);
    });
};