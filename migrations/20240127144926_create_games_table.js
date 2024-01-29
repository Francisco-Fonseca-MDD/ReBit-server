/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Likes-Dislikes", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.integer("review_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.integer("like_dislike", 1).notNullable();
      table.foreign("review_id").references("id").inTable("Reviews");
      table.foreign("user_id").references("id").inTable("Users");
    })
    .createTable("Games", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.char("game", 255).notNullable();
      table.text("short_description").notNullable();
      table.text("detailed_description").notNullable();
      table.text("about").notNullable();
      table.double("price", 8, 2).notNullable();
      table.date("release_date").notNullable();
      table.datetime("latest_update").notNullable();
    })
    .createTable("Tags", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.integer("game_id").unsigned().notNullable();
      table.integer("tag_id").unsigned().notNullable();
      table.foreign("game_id").references("id").inTable("Games");
      table.foreign("tag_id").references("id").inTable("Tag-List");
    })
    .createTable("Users", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.char("username", 255).notNullable();
      table.varchar("password", 255).notNullable();
    })
    .createTable("Reviews", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.text("review").notNullable();
      table.integer("game_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.integer("score").notNullable();
      table.foreign("game_id").references("id").inTable("Games");
      table.foreign("user_id").references("id").inTable("Users");
    })
    .createTable("Tag-List", function (table) {
      table.increments("id").unsigned().notNullable().primary();
      table.char("tag", 255).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Likes-Dislikes")
    .dropTableIfExists("Games")
    .dropTableIfExists("Tags")
    .dropTableIfExists("Users")
    .dropTableIfExists("Reviews")
    .dropTableIfExists("Tag-List");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
