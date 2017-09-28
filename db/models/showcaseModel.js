const Sequelize = require('sequelize');
const sequelize = require('../../db');
const Graphic = require('./graphicModel');
const dummyShowcase = require('../../lib/dummyDataImageLinks').dummyShowcase;

const Showcase = sequelize.define('showcase', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  link: Sequelize.STRING
})

// Showcase.belongsTo(Graphic);

Showcase.sync({ force: false })
  .then(() => {
    console.log('Showcase table created');
  })
  .catch( (err) => console.error('In graphics table', err));

// for (var key in dummyShowcase) {
//   Showcase.create({
//     link: dummyShowcase[key]
//   })
// }

module.exports = Showcase;
