const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 상품 좋아요
 * PARAMETERS : ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/02
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { ProductId, id } = req.body;

  const findDataQuery = `
    SELECT    id
      FROM    wish
     WHERE    ProductId = ${ProductId}
       AND    UserId = ${req.user.id}
    `;

  const insertQuery = `
    INSERT    INTO    wish
    (
        UserId,
        ProductId,
        createdAt,
        updatedAt
    )
    VALUES
    (
        ${req.user.id},
        ${ProductId},
        NOW(),
        NOW()
    )
    `;

  try {
    const findData = await models.sequelize.query(findDataQuery);

    // 한번도 좋아요를 남기지 않았을 때 <- 받아온 값 그대로 생성
    if (findData[0].length === 0) {
      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    }
    // 좋아요를 남긴 내역이 존재할 때
    if (findData[0].length > 0) {
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");

      const deleteQuery = `
                 DELETE
                   FROM  wish
                  WHERE  UserId = ${req.user.id}
                    AND  id = ${id}
                 `;

      await models.sequelize.query(deleteQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("좋아요를 남길 수 없습니다.");
  }
});

module.exports = router;
