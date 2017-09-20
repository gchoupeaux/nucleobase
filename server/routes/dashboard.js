const express = require('express');
const middleware = require('../middleware');
const path = require('path');

const router = express.Router();

/*
router.route('/')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    console.log('PATH: /');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/profile')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    console.log('PATH: /profile');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/schedule')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    console.log('PATH: /schedule');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/trainers')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    console.log('PATH: /trainers');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/clients')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    console.log('PATH: /clients');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });
*/

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    console.log('PATH: /');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    console.log('PATH: /profile');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/schedule')
  .get(middleware.auth.verify, (req, res) => {
    console.log('PATH: /schedule');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/trainers')
  .get(middleware.auth.verify, (req, res) => {
    console.log('PATH: /trainers');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/clients')
  .get(middleware.auth.verify, (req, res) => {
    console.log('PATH: /clients');
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

module.exports = router;