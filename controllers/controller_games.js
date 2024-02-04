const knex = require("knex")(require("../knexfile"));
const utils = require("../utils");

const allGames = async (_req, res) => {
  try {
    const gameTagPairs = await knex("games")
      .select(
        "games.id",
        "games.game",
        "games.short_description",
        "games.about",
        "games.release_date",
        "games.latest_update",
        "games.score",
        "games.header_url",
        "tag-list.tag"
      )
      .leftJoin("Tags", "games.id", "Tags.game_id")
      .join("tag-list", "tag-list.id", "tags.tag_id");

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
          about: pair.about,
          release_date: pair.release_date,
          latest_update: pair.latest_update,
          score: pair.score,
          header_url: pair.header_url,
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
};

const oneGame = async (req, res) => {
  try {
    const gameId = Number(req.params.id);
    const gameTagPairs = await knex("games")
      .select(
        "games.id",
        "games.game",
        "games.short_description",
        "games.detailed_description",
        "games.about",
        "games.release_date",
        "games.latest_update",
        "games.score",
        "games.header_url",
        "tag-list.tag"
      )
      .where({ "games.id": gameId })
      .leftJoin("Tags", "games.id", "Tags.game_id")
      .join("tag-list", "tag-list.id", "tags.tag_id");

    const reviews = await knex("reviews")
      .select(
        "reviews.id",
        "reviews.review",
        "reviews.score",
        "reviews.user_id",
        "users.username"
      )
      .join("users", "users.id", "reviews.user_id")
      .where({ game_id: req.params.id });

    const newReviews = await Promise.all(
      reviews.map(async (review) => {
        const reviewLikes = await knex("likes-dislikes").where({
          review_id: review.id,
        });
        let likes = 0;
        let dislikes = 0;
        reviewLikes.forEach((user) => {
          if (Boolean(user.like_dislike)) likes++;
          if (Boolean(user.like_dislike)) dislikes++;
        });
        return { ...review, likes: likes, dislikes: dislikes };
      })
    );
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
          score: pair.score,
          header_url: pair.header_url,
          tags: pair.tag ? [pair.tag] : [],
        };
        gameMap.set(pair.id, newGame);
      }
    });
    const game = { ...gameMap.get(gameId), reviews: newReviews };

    res.json(game);
  } catch (error) {
    res.status(400).send(`Error retrieving game: ${error}`);
  }
};

const allTags = async (_req, res) => {
  try {
    const tags = await knex("tag-list");
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { allGames, oneGame, allTags };
