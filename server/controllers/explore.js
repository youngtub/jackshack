const express = require('express');
const Sequelize = require('sequelize');
const Graphics = require('../../db/models/graphicModel');
const Artist = require('../../db/models/artistModel');

exports.getAll = (req, res) => {
  Graphics.findAll({})
  .then( (results) => {
    res.send(results)
  })
}

exports.getDetails = (req, res) => {
  var responseArray = [];

  var daLink = `https://drive.google.com/open?id=${req.body.link.slice(31)}`

  Graphics.update({
    view_count: Sequelize.literal('view_count + 1')
  }, {
    where: {
      link: daLink
    }
  })
  .then( () => {
    Graphics.findAll({
      where: {
        link: daLink
      }
    })
    .then( (graphicObject) => {
      var artist_id = graphicObject[0].dataValues.artistId;
      responseArray.push(graphicObject[0].dataValues.title, graphicObject[0].dataValues.link, graphicObject[0].dataValues.view_count)
      Artist.findAll({
        where: {
          id: artist_id
        }
      })
      .then( (artistObject) => {
        var artistName = artistObject[0].dataValues.name;
        responseArray.push(artistName);
      })
      .then( () => {
        //response array: [title, link, view_count, artistName]
        res.send(responseArray)
      })
    })
  })
}
