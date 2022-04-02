const secrets = require('../config/secret.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require("../users/users-model");
const { checkLoginPayload, usernameUnique, validateCredentials,} = require('../middleware/auth-middleware');

const router = require('express').Router();

function createToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  };
  const options = {
    expiresIn: '2d',
  };
   return jwt.sign(
     payload,
     secrets.jwtSecret,
     options
   ); 
  }

router.post('/register',usernameUnique,checkLoginPayload, (req, res) => {
  res.end('implement register, please!');
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8);
      Users.add({ username, password: hash })
      .then(newUser => {
        res.status(200).json(newUser)
})
      .catch(next)
  
});

router.post('/login' , validateCredentials , checkLoginPayload,(req, res, next) => {
 res.end('implement login, please!');
  const { username, password } = req.body
   Users.findByUser(username)
  .then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
       const token = createToken(user)
       res.status(200).json({
        message: `welcome ${username}`,
        token
    })
    } else {
      next({ status:401, message: 'invalid credentials' })
    }
  })
  .catch(next)
 }); 
 

module.exports = router;
