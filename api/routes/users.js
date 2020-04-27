var express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")
var router = express.Router();

results = { username: "test", id: 1, password_hash: "$2b$10$S7rOF3WbY8uomRVl3T7poOu6X.CRbdt4F/tIDfHrvuWv9BshxCCHi" }

const secret = "abc123"
const saltRounds = 10;

router.post('/register', function(req, res, next) {
  // const reqBody = { username: "test", password: "test", email: "test@test.com"}
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    // User.create({
    //   password: hash
    // })
    console.log(hash)
    res.send({password_hash: hash})
  });
});

// this is the hash for user 1: $2b$10$S7rOF3WbY8uomRVl3T7poOu6X.CRbdt4F/tIDfHrvuWv9BshxCCHi

/* GET users listing. */
router.post('/login', function(req, res, next) {
  // connect to db, check that the username, findOne and get the correct user
    const correctUser = results
    bcrypt.compare(req.body.password, correctUser.password_hash, function(err, result) {
      if (result === true) {
        var token = jwt.sign({ user_id: results.id }, secret);
        res.send({ message: "login is successful. Here is your token: ", token});
      } else {
        res.status(400).send({ message: "login is not successful"})
      }
    });
});

router.get('/profile', userShouldBeLoggedIn, function(req, res, next) {
  // database request to get profile data
  res.send({message: "here is your protected data, user " + req.user_id})
})


router.get('/my_orders', userShouldBeLoggedIn, function(req, res, next) {
  // database request to get orders using req.user_id
  // Order.where({user_id: req.user_id})
  res.send({message: "here are your orders, user " + req.user_id})
})


module.exports = router;