const express = require('express');
const Sequelize = require('sequelize');
const Showcase = require('../../db/models/showcaseModel');
const parser = require('body-parser');

exports.getAll = (req, res) => {
  Showcase.findAll({})
  .then( (data) => {
    res.send(data);
  })
}
