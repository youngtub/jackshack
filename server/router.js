const express = require('express');
const router = require('express').Router();

const showcase = require('./controllers/showcase');
const explore = require('./controllers/explore');
const signup = require('./controllers/signup');
const submit = require('./controllers/submit');
const login = require('./controllers/login');
const order = require('./controllers/order');

router.get('/showcase', showcase.getAll);

router.get('/explore', explore.getAll);

router.post('/getdetails', explore.getDetails);

router.post('/signup', signup.handleSignUp);

router.post('/login', login.handleLogin);

router.post('/submitgraphic', submit.handleSubmit);

router.post('/getuserid', login.justGetUserId);

router.post('/updateRating', explore.updateRating);

router.post('/addToBag', order.addToBag);

router.post('/getBagDetails', order.getBagDetails);

router.post('/getArtistNameForBag', order.decorateShirtObjWithArtistName);

router.post('/getGraphicTitleForBag', order.decorateShirtObjWithGraphicTitle);

module.exports = router;
