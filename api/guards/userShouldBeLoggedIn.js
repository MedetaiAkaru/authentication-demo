
var jwt = require('jsonwebtoken');

const secret = "abc123"

function userShouldBeLoggedIn(req, res, next) {
  let token = req.headers["x-access-token"]
  if (!token) {
    res.send({message: "please provide a token"})
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) res.status(401).send({message: err})
      else {
        req.user_id = decoded.user_id
        next()
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;