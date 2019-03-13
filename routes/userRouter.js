//Dependencies
const router = require("express").Router();

//Models
const Users = require("../helpers/user-model");
//Middleware
const { restricted, checkRole } = require("../Auth/middleware");

//Routes
router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});
//Routes
router.get("/:id", restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

router.put("/:id", restricted, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(updatedUser => {
      res.json({ updatedUserId: updatedUser, dataUpdated: req.body });
    })
    .catch(err => res.send(err));
});

module.exports = router;
