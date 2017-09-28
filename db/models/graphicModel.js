const Sequelize = require('sequelize');
const sequelize = require('../../db')
const Artist = require('./artistModel');
const linksObj = require('../../lib/dummyDataImageLinks').dummyDataLinks;

const Graphic = sequelize.define('graphics', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  link: Sequelize.STRING,
  total_rating: Sequelize.FLOAT,
  number_of_ratings: Sequelize.INTEGER,
  avg_rating: Sequelize.FLOAT,
  view_count: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  tags: Sequelize.ARRAY(Sequelize.STRING)
}, {
  timestamps: false
})

Graphic.belongsTo(Artist);

Graphic.sync({ force: false })
  .then(() => {
    console.log('Graphics table created');
  })
  .catch( (err) => console.error('In graphics table', err));

var count = 0;
if (count === 0) {
  for (var key in linksObj) {
    Graphic.create({
      title: key,
      link: linksObj[key],
      total_rating: 0,
      number_of_ratings: 0,
      avg_rating: 0,
      view_count: 0,
      created_at: new Date(),
    })
  }
  count = 1;
}

module.exports = Graphic;
