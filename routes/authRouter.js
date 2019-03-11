//Dependencies
const router = require("express").Router(),
  bcrypt = require("bcrypt");

//Custom Middleware
const generateToken = require("../Auth/token-service");
const Users = require("../helpers/user-model");

//Routes
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => res.status(500).json(err));
});
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Welcome!",
          token,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    });
});

module.exports = router;
