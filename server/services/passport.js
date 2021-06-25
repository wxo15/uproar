const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

// pull model schema from mongoose
const User = mongoose.model('users');

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id)
		.then(user => {
			done(null,user);
		})
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {
	
	const existingUser = await User.findOne({googleID: profile.id});
	if (existingUser) {
		//already have a profile
		return done(null, existingUser);
	} 
	
	//if profileID doesn't exist, push to database
	const user = await new User({googleID: profile.id}).save();
	done(null,user);
	}
	
	// print tokens and profiles
	/*console.log('Access token:', accessToken);
	console.log('Refresh token:', refreshToken);
	console.log('Profile:', profile);*/

));