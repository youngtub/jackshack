const express = require('express');
const Sequelize = require('sequelize');
const artists = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.handleLogin = (req, res) => {

  var account = artists.findAll({
    attributes: ['id'],
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then( (id) => {
    if (!id) res.send('Incorrect credentials, try again')
    else res.send(JSON.stringify(id[0].dataValues.id));
  })
};

exports.justGetUserId = (req, res) => {
  var queryName = req.body.name.replace(/ /g, '');
  console.log(queryName.length)
  var account = artists.findAll({
    attributes: ['id'],
    where: {
      name: queryName,
    }
  })
  .then( (id) => {
    res.send(JSON.stringify(id[0].dataValues.id));
  })
};
