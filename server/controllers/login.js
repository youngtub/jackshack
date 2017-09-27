const express = require('express');
const Sequelize = require('sequelize');
const artists = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.handleLogin = (req, res) => {

var account = artists.findAll({
  where: {
    name: req.body.name,
    password: req.body.password
  }
})
.then( (data) => {
  if (!data) res.send('Incorrect credentials, try again')
  else res.send('Ok you can log in')
})

}
