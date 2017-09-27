const express = require('express');
const Sequelize = require('sequelize');
const Graphics = require('../../db/models/graphicModel');

exports.getAll = (req, res) => {
  Graphics.findAll({})
  .then( (results) => {
    res.send(results)
  })
}

exports.getDetails = (req, res) => {
  console.log('ID', req.body.link.slice(31))
  var daLink = `https://drive.google.com/open?id=${req.body.link.slice(31)}`
  Graphics.findAll({
    where: {
      link: daLink
    }
  })
  .then( (object) => {
    console.log('EXPLORE', object[0].dataValues)
    res.send(object)
  })
}
