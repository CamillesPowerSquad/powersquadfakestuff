var account = require('./../config/config.js');
var Seq = require('sequelize');
var seq = new Seq('postgres://'+account.usernameDB+':'+account.passwordDB+'@localhost:5432/passportDB');

var User = seq.define('users', {
  id: {type: Seq.INTEGER, autoIncrement: true, primaryKey: true},
  email: {type: Seq.STRING, unique: true},
  password: Seq.STRING,
  name: Seq.STRING,
  age: Seq.INTEGER,
  isRad: Seq.BOOLEAN
});



User.sync();

module.exports = User;
