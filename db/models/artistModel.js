const Sequelize = require('Sequelize');
const sequelize = require('../../db');

const Artist = sequelize.define('artists', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  score: Sequelize.FLOAT
});

Artist.sync({ force: false })
  .then(() => {
    console.log('Artists table created');
  })
  .catch( (err) => console.error('In Artist table', err))

module.exports = Artist;
