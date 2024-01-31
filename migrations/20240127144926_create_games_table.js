exports.up = function (knex) {
  return knex.schema
    .createTable("Games", function (table) {
      table.increments("id").unsigned().primary();
      table.string("game", 255).notNullable();
      table.string("short_description").notNullable();
      table.string("detailed_description").notNullable();
      table.string("about").notNullable();
      table.double("price", 8, 2).notNullable();
      table.date("release_date").notNullable();
      table.date("latest_update").notNullable();
      table.integer("score");
    })
    .createTable("Tag-List", function (table) {
      table.increments("id").unsigned().primary();
      table.string("tag", 255).notNullable();
    })
    .createTable("Users", function (table) {
      table.increments("id").unsigned().primary();
      table.string("username", 255).notNullable();
      table.string("password", 255).notNullable();
    })
    .createTable("Reviews", function (table) {
      table.increments("id").unsigned().primary();
      table.string("review").notNullable();
      table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Games")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("score").notNullable();
    })
    .createTable("Tags", function (table) {
      table.increments("id").unsigned().primary();
      table
        .integer("game_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Games")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("tag_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Tag-List")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("Likes-Dislikes", function (table) {
      table.increments("id").unsigned().primary();
      table
        .integer("review_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Reviews")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.boolean("like_dislike").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Likes-Dislikes")
    .dropTableIfExists("Tags")
    .dropTableIfExists("Reviews")
    .dropTableIfExists("Users")
    .dropTableIfExists("Tag-List")
    .dropTableIfExists("Games");
};
