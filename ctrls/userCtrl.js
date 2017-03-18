var User = require('./../models/userModel');

module.exports = {
  login: function(req, res){
    console.log(req);
    // res.send();
    res.end();
  },
  read: function(req, res){
    User.findAll()
    .then(function(result, err){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: function(req, res){
    User.findOne({
      where: {id: req.params.id}
    })
    .then(function(user){
      user.update(req.body)
      .then(function(result, err){
        if(err){
          res.send(err);
        } else {
          res.send(result);
        }
      })
    });
  },
  delete: function(req, res){
    User.destroy({
      where: {id: req.params.id}
    })
    .then(function(result, err){
      if(err){
        res.send(err);
      } else {
        res.send(res.body);
      }
    });
  },
  getMe: function(req, res){
    console.log("hi");
    if(req.user){
      User.findOne({
        where: {id: req.user.id}
      }).then(function(result, err){
        if(err){
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } else {
      res.send();
    }
  },
  logout: function(req, res){
    req.session.destroy();
    console.log(req.params.id + " is logged out");
    res.send();
  }
};
