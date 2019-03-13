//Dependencies
const router = require("express").Router();

//Models
const Users = require("../helpers/user-model");
const Post = require("../helpers/post-model");
const Comment = require("../helpers/comment-model");
//Middleware
const { restricted, checkRole } = require("../Auth/middleware");

router.get("/", async (req, res) => {
  try {
    //Gets all posts
    const posts = await Users.getAllPosts();
    const comments = await Users.getAllComments();
    const mappedPosts = posts.map(p => {
      const comment = comments.filter(c => c.post_id === p.id);

      return { ...p, comment };
    });

    res.status(200).json(mappedPosts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the posts" });
  }
});
//gets posts related to users
router.get("/:id", async (req, res) => {
  const post = await Post.getById(req.params.id);
  try {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Error getting posts" });
  }
});

router.post("/", async (req, res) => {
  const post = await Post.insert(req.body);
  try {
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body);
    if (updatedPost)
      res
        .status(200)
        .json({ message: `Updated user: ${updatedPost}`, postInfo: req.body });
    else res.status(404).json({ message: "The user could not be found!" });
  } catch (error) {
    res.status(500).json({ message: "Error updated post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.remove(req.params.id);
    if (deletedPost > 0) {
      res.status(200).json({ message: "The Post has been deleted!" });
    } else {
      res.status(404).json({ message: "The Post could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing the post" });
  }
});

//Comment routes

router.post("/comment", (req, res) => {
  Comment.insert(req.body)
    .then(addedPost => {
      console.log(addedPost);
      res.status(200).json({ addedComment: req.body });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});
router.put("/comment/:id", (req, res) => {
  Comment.update(req.params.id, req.body)
    .then(updatedComment => {
      if (updatedComment > 0) {
        res.status(200).json({ message: "Success!", comment: req.body });
      } else {
        res.status(400).json({ message: "Please provide valid information" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});
router.delete("/comment/:id", (req, res) => {
  Comment.remove(req.params.id)
    .then(deletedComment => {
      if (deletedComment > 0) {
        res.status(200).end();
      } else {
        res.status(400).json({ message: "This comment does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
