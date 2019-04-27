const express = require('express');
var router = express.Router();

var { User } = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:3000/users/
router.get('/', (req, res) => {
  User.find((err, docs) => {
    if(!err){ res.send(docs); }
    else { console.log('Error in Retrieving Users : ' + JSON.stringify(err, undefined, 2)); }
  });
});

router.get('/:id',(req,res) => {
	if(!ObjectId.isValid(req.params.id))
		return res.status(400).send(`No record with given id : ${req.params.id}`);

	User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
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

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
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
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
