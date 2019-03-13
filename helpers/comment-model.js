const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("commentSection");
}

function getById(id) {
  return db("commentSection")
    .where({ id })
    .first();
}

function insert(comment) {
  return db("commentSection")
    .insert(comment)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("commentSection")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("commentSection")
    .where("id", id)
    .del();
}
