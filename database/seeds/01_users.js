exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Admin", password: "password", accountType: "parent" },
        { username: "Amanda", password: "password", accountType: "volunteer" },
        { username: "Socks", password: "password", accountType: "parent" }
      ]);
    });
};
