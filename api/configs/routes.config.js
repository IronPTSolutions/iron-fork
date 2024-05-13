const express = require("express");
const router = express.Router();
const storage = require('../configs/storage.config');
const restaurants = require("../controllers/restaurants.controller");
const comments = require("../controllers/comments.controller");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/restaurants", auth.checkAuth, auth.checkRole("admin"), storage.single('coverImage'), restaurants.create);
router.get("/restaurants", auth.checkAuth, restaurants.list);
router.get("/restaurants/:id", auth.checkAuth, restaurants.detail);
router.patch("/restaurants/:id", auth.checkAuth, auth.checkRole("admin"), storage.single('coverImage'), restaurants.update);
router.delete("/restaurants/:id", auth.checkAuth, auth.checkRole("admin"), restaurants.delete);

router.post("/restaurants/:id/comments", auth.checkAuth, comments.create);
router.get("/restaurants/:id/comments", auth.checkAuth, comments.list);

router.get("/profile", auth.checkAuth, users.profile);
router.post("/users", users.create);
router.post("/login", users.login);

router.post("/enterprises/:enterpriseId/restaurants", auth.checkAuth, auth.checkRole("admin"), restaurants.create);

// Error handlers

router.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});


module.exports = router;