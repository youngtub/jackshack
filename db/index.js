const Sequelize = require('sequelize');

sequelize = new Sequelize('jackshack', 'anr', 'roxthefox', {
  // host: 'jackshack.chfewwwsv5ni.us-east-2.rds.amazonaws.com',
  host: 'postgres://bszlqrwdpdvvyc:dcdcb19860bec81f9bdb6789adee0c792f646e204902f50ceb0e381733aa274b@ec2-54-235-90-125.compute-1.amazonaws.com:5432/dar0ob84tuclkm',
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
