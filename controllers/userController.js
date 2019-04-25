const express = require('express');
var router = express.Router();

var { User } = require('../models/user');

// => localhost:3000/users/
router.get('/', (req, res) => {
  User.find((err, docs) => {
    if(!err){ res.send(docs); }
    else { console.log('Error in Retrieving Users : ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/', (req, res) => {
  var user = new User({
    guid: req.body.guid,
    isActive: req.body.isActive,
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    type: req.body.type,
    bloodgroup: req.body.bloodgroup,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    registered: req.body.registered,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  user.save((err, doc) => {
    if(!err) { res.send(doc); }
    else { console.log('Error in User Save : ' + JSON.stringify(err, undefined, 2));}
  });
});

module.exports = router;
