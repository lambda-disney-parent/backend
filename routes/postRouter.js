//Dependencies
const router = require("express").Router();

//Models
const Users = require("../helpers/user-model");
const Post = require("../helpers/post-model");

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
  console.log(post);
  try {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
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

module.exports = router;
