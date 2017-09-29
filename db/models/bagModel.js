const Sequelize = require('sequelize');
const sequelize = require('../../db');
const Artist = require('./artistModel');
const Graphic = require('./graphicModel');

const Bag = sequelize.define('bag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  color: Sequelize.STRING,
  size: Sequelize.STRING,
  customerid: Sequelize.INTEGER
})

Bag.belongsTo(Artist);
Bag.belongsTo(Graphic);

Bag.sync({ force: false })
  .then(() => {
    console.log('Bag table created');
  })
  .catch( (err) => console.error('In bag table', err));

  module.exports = Bag;
