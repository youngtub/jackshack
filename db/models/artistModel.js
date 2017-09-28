const Sequelize = require('sequelize');
const sequelize = require('../../db');

const Artist = sequelize.define('artists', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  score: Sequelize.FLOAT
});

Artist.sync({ force: false })
  .then(() => {
    console.log('Artists table created');
  })
  .catch( (err) => console.error('In Artist table', err))

module.exports = Artist;
