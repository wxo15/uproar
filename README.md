# Uproar
This is a ReactJS web app to allow users to send out simple Yes/No survey emails in bulk. Responses from the recipients will be recorded and can be accessed.

Web app taken down due to Heroku ending their free plan.

<kbd>![Dashboard](https://github.com/wxo15/uproar/blob/main/screenshots/dashboard.png)</kbd>

## Technology Overview

### Front-end
* React, MaterializeCSS for UI
* Redux to manage states

### Back-end
* ExpressJS for middleware, HTTP utilities etc
* PassportJS for OAuth
* Mongoose for MongoDB integration

### 3rd party services
* Google and Github OAuth for authorization
* MongoDB Atlas for info storage
* Stripe for payment
* SendGrid for email management


## User guide
### Authentication
You would need to authenticate using either Google or GitHub OAuth before use. 
<kbd>![Login](https://github.com/wxo15/uproar/blob/main/screenshots/login.png)</kbd>

Once logged in, you will be brought to the dashboard page. You would be able to link other login methods to your account.
<kbd>![Add-login](https://github.com/wxo15/uproar/blob/main/screenshots/add-login.png)</kbd>

### Get credit
Click on the `+5 Credit` button on the navigation bar. Since it is in test mode, use `4242 4242 4242 4242` for credit card number, XXX@XXX.XXX for email address, a future date in the date field, and a 3 digit number for the CVV.
<kbd>![Payment](https://github.com/wxo15/uproar/blob/main/screenshots/payment.png)</kbd>

### Send survey
Click on the + icon at bottom right of the dashboard page. You will be taken to a new survey form where you'd need to fill out title, email subject, email question and recipient list (comma separated). When you are done, review the survey, and then click Send. Each survey will deduct 1 credit from your account.
<kbd>![Survey](https://github.com/wxo15/uproar/blob/main/screenshots/survey.png)</kbd>

### Track your survey
You'd be able to track your survey on the dashboard page. Most recent survey will be shown on top, and you'd be able to see how many people have responded, and how many of each response were given.
<kbd>![Track-survey](https://github.com/wxo15/uproar/blob/main/screenshots/track-survey.png)</kbd>

## Clone guide
1. Clone the entire repo and run `npm install` in both `/server` folder and the `/server/client` folder.
2. You would need to make a file in `/server/config` directory called `dev.js`. The content should be the same as `/server/config/prod.js`, with the values changed to yours. You can find more information on generating the relevant keys on their respective websites. `redirectDomain` should be set to 'http://localhost:3000'.
3. Go to `/server` directory and run `npm run dev`. It should start up locally on port 3000.

