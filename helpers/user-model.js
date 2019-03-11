const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getUserPosts
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
function getUserPosts(userId) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.text", "u.username as postedBy")
    .where("p.user_id", userId);
}
