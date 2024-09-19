require('dotenv').config();

const { Sequelize } = require("sequelize");

const vars = process.env;

console.log('Dialect:', vars.DB_DIALECT); 

let isLog = vars.DB_LOGGING === "true";
  // ? (isLog = true)
  // : (isLog = false);

// const dbConfig = {
//   host: vars.DB_HOST,
//   port: vars.DB_PORT,
//   database: vars.DB_DATABASE,
//   username: vars.DB_USER,
//   password: vars.DB_PASSWORD,
//   dialect: vars.DB_DIALECT,
//   logging: isLog,
// };
const sequelize = new Sequelize(vars.DB_DATABASE, vars.DB_USER, vars.DB_PASSWORD, {
  host: vars.DB_HOST,
  port: vars.DB_PORT,
  dialect: vars.DB_DIALECT || 'postgres',  // Hard-code if still undefined
  logging: isLog,
});

// const sequelize = new Sequelize(dbConfig);
module.exports = sequelize;
