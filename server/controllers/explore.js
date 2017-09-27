const express = require('express');
const Sequelize = require('sequelize');
const Graphics = require('../../db/models/graphicModel');

exports.getAll = (req, res) => {
  Graphics.findAll({})
  .then( (results) => {
    res.send(results)
  })
}
