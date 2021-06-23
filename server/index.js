const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');
mongoose.connect(keys.mongoURI);

const app = express();

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

require('./routes/authRoutes')(app);

app.get('/',(req,res) =>{
	res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000
app.listen(PORT);