const knex = require("knex")(require("../knexfile"));
const utils = require("../utils");

const post = async (req, res) => {
  const review = req.body.review;
  const userId = req.body.userId;
  const gameId = req.body.gameId;
  const score = utils.analyse(review);

  const newReview = {
    review: review,
    game_id: gameId,
    user_id: userId,
    score: score,
  };
  await knex("reviews").insert(newReview);
  await utils.updateGamesScores();
  res.json(newReview);
};

const updateLike = async (req, res) => {
  const { userId, reviewId, like } = req.body;
  const update = await knex("likes-dislikes")
    .where({ review_id: reviewId })
    .andWhere({ user_id: userId })
    .update({ like_dislike: like });
  if (update == 0) {
    const newInteraction = {
      review_id: reviewId,
      user_id: userId,
      like_dislike: like,
    };
    await knex("likes-dislikes").insert(newInteraction);
    res.status(201).json({ created: newInteraction });
    return;
  }

  res.status(200).json({ updated: { ...req.body } });
};

const deleteReview = async (req, res) => {
  await knex("reviews").where({ id: req.body.id }).delete();
  res.sendStatus(204);
};

module.exports = { post, updateLike, deleteReview };
