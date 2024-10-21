"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require("../config/db.js")

// Define environment variables for connection details
var dbHost = process.env.POSTGRES_HOST || "localhost";
var dbName = process.env.POSTGRES_DB || "mydatabase";
var dbUser = process.env.POSTGRES_USER || "myuser";
var dbPassword = process.env.POSTGRES_PASSWORD || "mypassword";
var dbPort = process.env.DB_PORT || "5432"; 

// Initialize Sequelize with the environment variables
var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  })

sequelize
  .sync( /*{ force: true }*/ ) // Force To re-initialize tables on each run
  .then(function (err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  })

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
