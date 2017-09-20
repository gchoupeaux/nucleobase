
const express = require('express');
const middleware = require('../middleware');
const path = require('path');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/login')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/dashboard/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/signup/create',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/signup/create')
  .get((req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });


router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/dashboard/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/dashboard/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/dashboard/profile',
  failureRedirect: '/login'
}));

module.exports = router;
