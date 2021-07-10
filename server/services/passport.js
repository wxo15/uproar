const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
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
	proxy: true,
	passReqToCallback : true
}, async (req, accessToken, refreshToken, profile, done) => {

	const existingUser = await User.findOne({googleID: profile.id});
	if (existingUser) {
		//already have a profile
		return done(null, existingUser);
	} 
	
	//Check if currently logged in, add github to user. If not, create a new user
	if (!req.user){
		//if not logged in, push a new user to database
		const user = await new User({googleID: profile.id}).save();
		done(null, user);
	} else {
		//if logged in, add to existing user to database
		req.user.googleID = profile.id;
		await req.user.save();
		done(null, req.user);
	}
	
	// print tokens and profiles
	/*console.log('Access token:', accessToken);
	console.log('Refresh token:', refreshToken);
	console.log('Profile:', profile);*/
}));

passport.use(new GitHubStrategy({
	clientID: keys.githubClientID,
	clientSecret: keys.githubClientSecret,
	callbackURL: '/auth/github/callback',
	proxy: true,
	passReqToCallback : true
}, async (req, accessToken, refreshToken, profile, done) => {

	const existingUser = await User.findOne({githubID: profile.id});
	if (existingUser) {
		//already have a profile
		return done(null, existingUser);
	} 
	
	//Check if currently logged in, add github to user. If not, create a new user
	if (!req.user){
		//if not logged in, push a new user to database
		const user = await new User({githubID: profile.id}).save();
		done(null, user);
	} else {
		//if logged in, add to existing user to database
		req.user.githubID = profile.id;
		await req.user.save();
		done(null, req.user);
	}
	
	// print tokens and profiles
	/*console.log('Access token:', accessToken);
	console.log('Refresh token:', refreshToken);
	console.log('Profile:', profile);*/

}));

