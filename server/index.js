const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
const bodyParser = require('body-parser');
require('./models/User.js');
require('./models/Survey.js');
require('./services/passport.js');
mongoose.connect(keys.mongoURI);

const app = express();


// List of Middlewares
app.use(bodyParser.json()); //middleware to parse request body
app.use(
	cookieSession({
		// keep for 2 days
		maxAge: 5 * 24 * 60 * 60 * 1000,
		//get cookie key from keys.js
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());


// List of Route Handlers
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
/// only checks in production environment
if (process.env.NODE_ENV === 'production'){
	// checks client/build
	app.use(express.static('client/build'));

	// if route doesnt exist until now, give index.html
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
	});
}

app.get('/',(req,res) =>{
	res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000
app.listen(PORT);