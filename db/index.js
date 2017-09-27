const Sequelize = require('sequelize');

sequelize = new Sequelize('jackshack', 'anr', 'roxthefox', {
  host: 'jackshack.chfewwwsv5ni.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

  sequelize.authenticate()
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
