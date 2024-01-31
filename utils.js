const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const knex = require("knex")(require("./knexfile"));

const analyse = (review) => {
  return sentiment.analyze(review).score;
};

const updateGamesScores = async () => {
  const games = await knex("games");
  for (let i = 1; i <= games.length; i++) {
    const revScores = await knex("reviews")
      .select("score")
      .where({ game_id: i });
    let averageScore =
      revScores.reduce((sum, obj) => {
        return (sum += obj.score);
      }, 0) / revScores.length;
    averageScore *= 100;
    await knex("games").where({ id: i }).update({ score: averageScore });
  }
};

module.exports = { analyse, updateGamesScores };
