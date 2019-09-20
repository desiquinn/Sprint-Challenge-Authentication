const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/user-model.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
    .then(saved => {
      req.statusCode(201).json(saved);
    })
    .catch(err => {
      console.log('Register Error:', err);
      res.status(500).json({message: "could not register new user"})
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ Message: 'Invalid Credentials' })
      }
    })
    .catch(err => {
      console.log('Login Error:', err)
      res.status(500).json({ message: "Could not log in successfully"})
    });
});

function getToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;
