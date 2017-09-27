const express = require('express');
const router = require('express').Router();

const showcase = require('./controllers/showcase');
const explore = require('./controllers/explore');
const signup = require('./controllers/signup');
const submit = require('./controllers/submit');

router.get('/showcase', showcase.getAll);

router.get('/explore', explore.getAll);


module.exports = router;
