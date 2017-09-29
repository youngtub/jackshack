const express = require('express');
const Sequelize = require('sequelize');
const graphics = require('../../db/models/graphicModel');
const artists = require('../../db/models/artistModel');
const parser = require('body-parser');
const axios = require('axios');

exports.handleSubmit = (req, res) => {
  var tagsArray = req.body.tags.split(',');
  // var GvisionTags = [];
  // var GVisionAPIKey = 'AIzaSyBNwLGlCtldxu1pTmgX-9U5Q-TmqMNpnd8';
  //
  // var imgUrl = `https://drive.google.com/uc?id=${req.body.url.slice(-28)}`;
  //
  //   axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GVisionAPIKey}`, {
  //     "requests": [
  //       {
  //         "image": {
  //           "content": encoded
  //         },
  //         "features": [
  //           {
  //             "type": "LABEL_DETECTION"
  //           }
  //         ]
  //       }
  //     ]
  //   })
  //   .then( (res) => {
  //     console.log('RESPONSE FROM GVISION', res)
  //     res.responses[0].labelAnnotations.forEach( (label) => {
  //       GvisionTags.push(label.description)
  //     })
  //   })
  //   .then( () => {
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
        // gvisiontags: GvisionTags
      })
      .then( () => res.send('Ok'))
    // })
    // .catch((err) => console.error(err))
  // })
}
