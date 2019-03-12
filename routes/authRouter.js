//Dependencies
const router = require("express").Router(),
  bcrypt = require("bcrypt");

//Custom Middleware
const generateToken = require("../Auth/token-service");
const Users = require("../helpers/user-model");

//Routes
router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  //checks if user is created
  const { username } = req.body;
  if (await Users.findBy({ username }).first()) {
    res.status(403).json({ message: "This account already exists!" });
  }

  Users.add(user)
    .then(saved => {
      res
        .status(201)
        .json({ message: "Account created!", username: saved.username });
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
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    });
});

module.exports = router;
