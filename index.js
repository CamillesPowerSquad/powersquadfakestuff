var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var userCtrl = require('./ctrls/userCtrl');
var config = require('./config/config');
var app = express();

require('./config/passport')(passport);

app.use(cors());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60*2}
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/login', passport.authenticate('local-signup'), userCtrl.login);
app.get('/users', userCtrl.read);
app.put('/users/:id', userCtrl.update);
app.delete('/users/:id', userCtrl.delete);
app.get('/users/me', userCtrl.getMe);
app.get('/logout', userCtrl.logout);

app.listen(8000, function(){
  console.log("running on 8000");
});
