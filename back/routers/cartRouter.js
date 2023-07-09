const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 장바구니 리스트
 * PARAMETERS : -
 * ORDER BY : creatdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const selectQuery = `
    SELECT  A.id,
            A.qun,
            A.UserId,
            A.ProductId,
            A.ProductOptionId,
            A.etcOption,
            B.name,
            B.subName,
            B.price,
            FORMAT(B.price, 0)														            AS formatPrice,
            CONCAT(FORMAT(B.price, 0), "원")											        AS concatPrice,
            B.detail,
            B.infoType,
            B.infoConsist,
            B.infoColor,
            B.infoSize,
            B.infoFrom,
            B.discount,
            FORMAT(B.discount, 0)														            AS formatDiscount,
            CONCAT(FORMAT(B.discount, 0), "원")											        AS concatDiscount,
            B.isNew,
            B.isBest,
            B.isRecomm,
            B.thumbnail,
            B.price - B.discount							            	          AS discountPrice,
            FORMAT(B.price - B.discount , 0)					            	AS formatDiscountPrice,
    		    CONCAT(FORMAT(B.price - B.discount, 0), "원")	            	AS concatDiscountPrice,
            CAST((B.price - B.discount) * A.qun AS signed integer)								    AS totalPrice,
            FORMAT((B.price - B.discount) * A.qun, 0)                       AS formatTotalPrice,
            CONCAT(FORMAT((B.price - B.discount) * A.qun, 0), "원")         AS concatTotalPrice,
    		    C.value																	AS optionName
      FROM  cart					A
     INNER
      JOIN  product					B
        ON  A.ProductId = B.id
     INNER
      JOIN  productOption			C
        ON  A.ProductOptionId = C.id
     WHERE  B.isDelete = 0
       AND  A.UserId = ${req.user.id}
     ORDER  BY  A.createdAt DESC
    `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("장바구니 리스트를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 추가
 * PARAMETERS : products
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { products } = req.body;

  // products : [
  //              {
  //                ProductId,
  //                ProductOptionId,
  //                qun,
  //                etcOption
  //              },
  //            ];

  if (!Array.isArray(products)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  console.log(products);

  try {
    let ids = [];

    await Promise.all(
      products.map(async (data) => {
        const findQuery = `
        SELECT  id
          FROM  cart
         WHERE  ProductId = ${data.ProductId}
           AND  ProductOptionId = ${data.ProductOptionId}
           AND  etcOption = "${data.etcOption}"
           AND  UserId = ${req.user.id}
        `;

        const findResult = await models.sequelize.query(findQuery);

        if (findResult[0].length > 0) {
          const updateQuery = `
          UPDATE  cart
             SET  qun = qun + ${data.qun}
           WHERE  id = ${findResult[0][0].id}
          `;

          await models.sequelize.query(updateQuery);

          ids.push(findResult[0][0].id);
        } else {
          const insertQuery = `
          INSERT INTO cart (
              UserId,
              ProductId,
              ProductOptionId,
              qun,
              etcOption,
              createdAt,
              updatedAt
          )
          VALUES
          (
              ${req.user.id},
              ${data.ProductId},
              ${data.ProductOptionId},
              ${data.qun},
              "${data.etcOption}",
              NOW(),
              NOW()
          );
          `;

          const insertResult = await models.sequelize.query(insertQuery);

          ids.push(insertResult[0]);
        }
      })
    );

    const selectQuery = `
    SELECT  A.id,
            A.qun,
            A.UserId,
            A.ProductId,
            A.ProductOptionId,
            A.etcOption,
            B.name,
            B.subName,
            B.price,
            FORMAT(B.price, 0)														            AS formatPrice,
            CONCAT(FORMAT(B.price, 0), "원")											        AS concatPrice,
            B.detail,
            B.infoType,
            B.infoConsist,
            B.infoColor,
            B.infoSize,
            B.infoFrom,
            B.discount,
            FORMAT(B.discount, 0)														            AS formatDiscount,
            CONCAT(FORMAT(B.discount, 0), "원")											        AS concatDiscount,
            B.isNew,
            B.isBest,
            B.isRecomm,
            B.thumbnail,
            B.price - B.discount							            	          AS discountPrice,
            FORMAT(B.price - B.discount , 0)					            	AS formatDiscountPrice,
    		    CONCAT(FORMAT(B.price - B.discount, 0), "원")	            	AS concatDiscountPrice,
            CAST((B.price - B.discount) * A.qun AS signed integer)								    AS totalPrice,
            FORMAT((B.price - B.discount) * A.qun, 0)                       AS formatTotalPrice,
            CONCAT(FORMAT((B.price - B.discount) * A.qun, 0), "원")         AS concatTotalPrice,
    		    C.value																	AS optionName
      FROM  cart					A
     INNER
      JOIN  product					B
        ON  A.ProductId = B.id
     INNER
      JOIN  productOption			C
        ON  A.ProductOptionId = C.id
     WHERE  B.isDelete = 0
       AND  A.id IN (${ids})
     ORDER  BY  A.createdAt DESC
    `;

    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(401).send("장바구니에 상품을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 수량 수정
 * PARAMETERS : id
 *              qun
 * ORDER BY : creatdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */
router.post("/qun/update", isLoggedIn, async (req, res, next) => {
  const { id, qun } = req.body;

  const findQuery = `
  SELECT  id 
    FROM  cart
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  cart
     SET  qun = ${qun}
   WHERE  id = ${id}
`;
  try {
    if (parseInt(qun) === 0) {
      return res.status(400).send("수량을 0이하로 설정할 수 없습니다.");
    }

    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("장바구니에 해당 상품이 존재하지 않습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("장바구니의 상품을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 삭제
 * PARAMETERS : cartIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */
router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { cartIds } = req.body;

  // cartIds : [1, 2, 3];

  if (!Array.isArray(cartIds)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      cartIds.map(async (data) => {
        const deleteQuery = `
        DELETE  
          FROM cart
         WHERE id = ${data}
        `;

        await models.sequelize.query(deleteQuery);
      })
    );
    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("장바구니의 상품을 삭제할 수 없습니다.");
  }
});

module.exports = router;
