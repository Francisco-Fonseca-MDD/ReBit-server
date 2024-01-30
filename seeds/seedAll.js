const games = require("../seed-data/games");
const users = require("../seed-data/users");
const reviews = require("../seed-data/reviews");
const tags = require("../seed-data/tags");
const tagsToGames = require("../seed-data/tagsToGames");
const like_dislikes = require("../seed-data/likes_dislikes");

exports.seed = async function (knex) {
  await knex("Games").del();
  await knex("Users").del();
  await knex("Reviews").del();
  await knex("Tag-List").del();
  await knex("Tags").del();
  await knex("Likes-Dislikes").del();

  await knex("Games").insert(games);
  await knex("Users").insert(users);
  await knex("Reviews").insert(reviews);
  await knex("Tag-List").insert(tags);
  await knex("Tags").insert(tagsToGames);
  await knex("Likes-Dislikes").insert(like_dislikes);
};
