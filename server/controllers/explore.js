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

  var daLink = `https://drive.google.com/open?id=${req.body.link.slice(-28)}`
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
      responseArray.push(graphicObject[0].dataValues.title, graphicObject[0].dataValues.link, graphicObject[0].dataValues.view_count, graphicObject[0].dataValues.number_of_ratings, graphicObject[0].dataValues.avg_rating)
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
        //response array: [title, link, view_count, number_of_ratings, avg_rating, artistName]
        res.send(responseArray)
      })
    })
  })
};

exports.updateRating = (req, res) => {

  Graphics.findAll({
    attributes: ['total_rating', 'number_of_ratings'],
    where: {
      title: req.body.title
    }
  })
  .then( (attributes) => {
    var newTotal = attributes[0].dataValues.total_rating + req.body.newRating;
    var newNumber = attributes[0].dataValues.number_of_ratings + 1;
    var newAvg = newTotal / newNumber;
    Graphics.update({
      total_rating: newTotal,
      number_of_ratings: newNumber,
      avg_rating: newAvg
    }, {
      where: {
      title: req.body.title
      }
    })
    .then( () => res.send('rating updated'))
  })
}
