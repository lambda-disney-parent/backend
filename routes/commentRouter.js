//Dependencies
const router = require("express").Router();

//Models
const Comment = require("../helpers/comment-model");

//Middleware
const { restricted, checkRole } = require("../Auth/middleware");
//gets comment by id
router.get("/:id", async (req, res) => {
  const comments = await Comment.getUserPosts(req.params.id);
  try {
    if (post) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting posts" });
  }
});

router.post("/", async (req, res) => {
  const comment = await Comment.insert(req.body);
  try {
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.params.id, req.body);
    if (updatedComment)
      res
        .status(200)
        .json({
          message: `Updated user: ${updatedComment}`,
          postInfo: req.body
        });
    else res.status(404).json({ message: "The user could not be found!" });
  } catch (error) {
    res.status(500).json({ message: "Error updated post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.remove(req.params.id);
    if (deletedComment > 0) {
      res.status(200).json({ message: "The Comment has been deleted!" });
    } else {
      res.status(404).json({ message: "The Comment could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing the comment" });
  }
});

module.exports = router;
