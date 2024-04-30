const express = require("express");
const router = express.Router();
const restaurants = require("../controllers/restaurants.controller");
const comments = require("../controllers/comments.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/restaurants", auth.checkAuth, auth.checkRole("admin"), restaurants.create);
router.get("/restaurants", auth.checkAuth, restaurants.list);
router.get("/restaurants/:id", auth.checkAuth, restaurants.detail);
router.patch("/restaurants/:id", auth.checkAuth, auth.checkRole("admin"), restaurants.update);
router.delete("/restaurants/:id", auth.checkAuth, auth.checkRole("admin"), restaurants.delete);

router.post("/restaurants/:id/comments", auth.checkAuth, comments.create);
router.get("/restaurants/:id/comments", auth.checkAuth, comments.list);

router.get("/profile", auth.checkAuth, users.profile);
router.post("/users", users.create);
router.post("/login", users.login);

module.exports = router;


router.post("/enterprises/:enterpriseId/restaurants", auth.checkAuth, auth.checkRole("admin"), restaurants.create);
