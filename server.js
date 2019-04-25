'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sshjuser:SSHJ678!@cluster0-s1qny.mongodb.net/test?retryWrites=true";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BloodBank");
  var myobj = [
    {guid:'57118cba-5c9f-4715-a14c-cfaax5e366bz',isActive:true,name:'Sarra Bounouh',gender:'female',age:27,type:'donor',bloodgroup:'O',email:'sarra.bounouh@gmail.com',phone:'+1 (206) 333-5555',address:'174 Gilmore Court, Beechmont, Texas, 9368',registered:'2018-12-22T07:57:32 +06:00',latitude:-20.558758,longitude:-34.019469}
  ];
  dbo.collection("Users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

// MongoClient.connect(url, function(err, db) {
//   console.log("hello");
//   if(!err) {
//     console.log("We are connected");
//   }
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
