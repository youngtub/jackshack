const express = require('express');
const Sequelize = require('sequelize');
const Bag = require('../../db/models/bagModel');
const Graphic = require('../../db/models/graphicModel');
const Artist = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.addToBag = (req, res) => {
  Bag.create({
    color: req.body.color,
    size: req.body.size,
    artistId: req.body.artistId,
    graphicId: req.body.graphicId,
    customerid: req.body.customerId
  })
  .then( () => res.send('Added to bag'))
}

exports.getBagDetails = (req, res) => {

  Bag.findAll({
    where: {
      customerid: req.body.customerid
    }
  })
  .then( (bagItems) => {
    // console.log('BAG ITEMS', bagItems);
    res.send(JSON.stringify(bagItems));
  })
};

exports.decorateShirtObjWithArtistName = (req, res) => {
  var shirt = req.body.shirt
  Artist.findAll({
    attributes: ['name'],
    where: {
      id: shirt.artistId
    }
  })
  .then( (artistName) => {
    shirt['artistName'] = artistName[0].dataValues.name;
    res.send(JSON.stringify(shirt));
  })
};

exports.decorateShirtObjWithGraphicTitle = (req, res) => {
  var shirt = req.body.shirt
  Graphic.findAll({
    attributes: ['title', 'link'],
    where: {
      id: shirt.graphicId
    }
  })
  .then( (dbres) => {
    shirt['graphicTitle'] = dbres[0].dataValues.title;
    shirt['imgurl'] = dbres[0].dataValues.link;
    res.send(JSON.stringify(shirt));
  })
}
