const express = require("express");
const router = express.Router();
const controller_games = require("../controllers/controller_games");

router.route("/").get(controller_games.allGames);

router.route("/:id").get(controller_games.oneGame);

module.exports = router;
