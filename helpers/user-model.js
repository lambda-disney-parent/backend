const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  getUserPosts,
  getAllPosts,
  getAllComments
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}
function getUserPosts(userId) {
  return db("posts as p")
    .select("p.id", "p.title", "u.username as postedBy")
    .join("users as u", "u.id", "p.user_id")
    .where("p.user_id", userId);
}
function getAllPosts() {
  return db("posts as p")
    .select("p.*", "u.username as postedBy")
    .join("users as u", "u.id", "p.user_id");
}
function getAllComments() {
  return db("commentSection as c")
    .select("c.*")
    .join("posts as p", "p.id", "c.post_id");
}
