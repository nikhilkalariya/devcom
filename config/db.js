const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nikhil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('MySQL Database connected...'))
  .catch((err) => console.log('Error: ' + err));

module.exports = sequelize;
