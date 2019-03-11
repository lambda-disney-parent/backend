//Dependencies
const router = require('express').Router();

//Models
const Users = require('../users/user-model');
//Middleware
const { restricted, checkRole } = require('../Auth/middleware');

//Routes
router.get('/', restricted, checkRole('owner'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, decodedToken: req.decodedJwt });
    })
    .catch(err => res.send(err));
});

module.exports = router;
