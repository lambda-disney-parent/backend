exports.up = function(knex) {
  return knex.schema
    .createTable("users", function(users) {
      users.increments();
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users.string("accountType", 128).notNullable();
    })
    .createTable("posts", function(posts) {
      posts.increments();
      posts.text("text").notNullable();

      posts
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
