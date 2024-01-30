require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));

app.use(express.json());
app.use(cors());

app.get("/games", async (_req, res) => {
  try {
    const gameTagPairs = await knex("games")
      .select(
        "games.id",
        "games.game",
        "games.short_description",
        "games.detailed_description",
        "games.about",
        "games.release_date",
        "games.latest_update"
      )
      .leftJoin("Tags", "games.id", "Tags.game_id")
      .join("tag-list", "tag-list.id", "tags.tag_id")
      .select("tag-list.tag");

    const gameMap = new Map();

    gameTagPairs.forEach((pair) => {
      if (gameMap.has(pair.id)) {
        if (pair.tag) {
          gameMap.get(pair.id).tags.push(pair.tag);
        }
      } else {
        const newGame = {
          id: pair.id,
          game: pair.game,
          short_description: pair.short_description,
          detailed_description: pair.detailed_description,
          about: pair.about,
          release_date: pair.release_date,
          latest_update: pair.latest_update,
          tags: pair.tag ? [pair.tag] : [],
        };
        gameMap.set(pair.id, newGame);
      }
    });

    const games = Array.from(gameMap.values()).sort((a, b) => {
      return a.id - b.id;
    });

    res.json(games);
  } catch (error) {
    res.status(400).send(`Error retrieving games: ${error}`);
  }
});

app.get("/games/:id", async (req, res) => {});

app
  .route("/reviews/:id")
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});

app.listen(
  port,
  console.log(`Server has been started with port:${process.env.PORT}`)
);
