const express = require('express');
const router = require('express').Router();

const showcase = require('./controllers/showcase');
const explore = require('./controllers/explore');
const signup = require('./controllers/signup');
const submit = require('./controllers/submit');
const login = require('./controllers/login');

router.get('/showcase', showcase.getAll);

router.get('/explore', explore.getAll);

router.post('/getdetails', explore.getDetails);

router.post('/signup', signup.handleSignUp);

router.post('/login', login.handleLogin);

router.post('/submitgraphic', submit.handleSubmit);

module.exports = router;
