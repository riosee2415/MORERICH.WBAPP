const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/list", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json([]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("장바구니 리스트를 불러올 수 없습니다.");
  }
});

module.exports = router;
