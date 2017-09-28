const express = require('express');
const Sequelize = require('sequelize');
const graphics = require('../../db/models/graphicModel');
const artists = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.handleSubmit = (req, res) => {
  var tagsArray = req.body.tags.split(',');
  graphics.create({
    title: req.body.title,
    link: req.body.url,
    total_rating: 0,
    number_of_ratings: 0,
    avg_rating: 0,
    view_count: 0,
    created_at: new Date(),
    artistId: req.body.artist,
    tags: tagsArray
  })
  .then( () => res.send('Ok'))
}
