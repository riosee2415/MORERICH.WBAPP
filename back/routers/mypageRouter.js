const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

const consistOfArrayToArray = (arr1, arr2, targetColumn) => {
  arr1.map((item) => {
    const tempArr = [];

    arr2.map((inItem) => {
      if (item.id === inItem[targetColumn]) {
        tempArr.push(inItem);
      }
    });

    item["connectArray"] = tempArr;
  });

  return arr1;
};

/**
 * SUBJECT : 구매내역 조회
 * PARAMETERS : status
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/bought/list", isLoggedIn, async (req, res, next) => {
  const { status } = req.body;
  try {
    const _status = status !== null ? parseInt(status) : 5;

    const selectQ1 = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.deliveryCompany,
            A.deliveryNo,
            A.UserId,
            A.status,
            DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            B.userId,
            B.username,
            B.email,
            B.mobile,
            B.point
      FROM	boughtHistory	A
     INNER
      JOIN	users 			B
        ON	A.UserId = B.id
     WHERE  1 = 1
       AND  A.UserId = ${req.user.id}
            ${_status !== 5 ? `AND  A.status = ${_status}` : ``}
     ORDER  BY A.createdAt DESC
    `;

    const selectQ2 = `
    SELECT	id,
            productName,
            price,
            CONCAT(FORMAT(price, 0), "원") 			AS viewPrice,
            \`option\`,
            thumbnail,
            BoughtHistoryId 
      FROM	boughtList
    `;

    const list1 = await models.sequelize.query(selectQ1);
    const list2 = await models.sequelize.query(selectQ2);

    const result = consistOfArrayToArray(list1[0], list2[0], "BoughtHistoryId");

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 위시리스트 조회
 * PARAMETERS :
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/wish/list", isLoggedIn, async (req, res, next) => {
  try {
    const selectQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.ProductId,
            B.thumbnail,
            B.name,
            B.subName,
            B.price,
            CONCAT(FORMAT(B.price, 0), "원") 			AS viewPrice,
            CONCAT(FORMAT(B.price - (B.discount / 100 * B.price), 0), "원")  AS viewCalcPrice,
            B.detail,
            B.infoType,
            B.infoConsist,
            B.infoColor,
            B.infoSize,
            B.infoFrom,
            B.discount,
            B.isNew,
            B.isBest,
            B.isRecomm,
            DATE_FORMAT(B.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(B.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(B.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(B.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            B.ProductTypeId,
            C.value
      FROM  wish			A
     INNER
      JOIN  product			B
        ON  A.ProductId = B.id
     INNER	
      JOIN	productType		C
        ON	B.ProductTypeId = C.id
     ORDER  BY A.createdAt DESC
    `;

    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

module.exports = router;
