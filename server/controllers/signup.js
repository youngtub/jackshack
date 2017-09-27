const express = require('express');
const Sequelize = require('sequelize');
const artists = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.handleSignUp = (req, res) => {

  // var existingUser = artists.findAll({
  //   where: {
  //     username: req.body.username
  //   }
  // })
  // .then( (data) => {
  //   data ? res.send('Account already exists') : return ;
  // })
  artists.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.password,
    score: 0
  })
  .then( () => res.send('successfully created account!'))
}
