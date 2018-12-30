var User = require('../app/models/user');
const router = require('express').Router();
module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	app.post('/users', async (req,res)=>{
		try {
			if(req.body.name === ""){
				req.flash('error','Name cannot be empty');
				res.redirect('back');
				return;
			}
			const user = new User(req.body);
			await user.save();
            req.flash('success',`${user.name} has been added`);
			res.redirect('/login')
		} catch (error) {
			req.flash('error','Something went wrong');
			res.redirect('back')
		}
		
	});
	
	app.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.render("user", { user});
	} catch (error) {
		console.log(error);
		req.flash('error','Cannot find user');
		res.redirect('back')
	}
	});
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});
	/*  facebook routes */
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { 
		  successRedirect: '/profile',
	      failureRedirect: '/' }));

	/*  google routes */
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
	app.get('/auth/google/callback', 
	  passport.authenticate('google', { 
		  successRedirect: '/profile',
		  failureRedirect: '/' }));
		  
	
	/* TWITTER ROUTER */
		app.get('/auth/twitter', passport.authenticate('twitter', {scope: ['profile', 'email']}));
	   app.get('/auth/twitter/callback', 
	  	passport.authenticate('twitter', { 
		  successRedirect: '/profile',
	      failureRedirect: '/' }));

	

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
		})
	};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}