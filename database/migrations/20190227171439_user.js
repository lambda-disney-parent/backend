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
      posts.string("title").notNullable();
      posts.string("meetingPlace").notNullable();
      posts.string("time").notNullable();
      posts.integer("numOfKids").notNullable();

      posts
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      posts.timestamps(true, true);
    })
    .createTable("commentSection", function(comments) {
      comments.increments();
      comments.string("comment");
      comments.string("repliedBy");
      comments
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      comments.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("commentSection")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
