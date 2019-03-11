exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("posts").insert([
    { user_id: 1, text: "Looking for someone to get my child!" },
    { user_id: 1, text: "Looking for someone to get my child!" },
    { user_id: 1, text: "Looking for someone to get my child!" },
    { user_id: 1, text: "Looking for someone to get my child!" },
    { user_id: 1, text: "Looking for someone to get my child!" }
  ]);
};
