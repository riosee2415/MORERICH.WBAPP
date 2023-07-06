const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

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
  const { status = 3 } = req.body;

  try {
    const selectQ1 = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.deliveryCompany,
            A.deliveryNo,
            A.UserId,
            A.status,
            A.reason,
            A.returnAccountName,
            A.returnBankName,
            A.returnAccountNum,
            DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            B.userId,
            B.username,
            B.email,
            B.mobile,
            B.point,
            (
              SELECT  SUM(C.price * C.qun)
                FROM  boughtList C
               WHERE  C.BoughtHistoryId = A.id
            )													AS boughtPrice,
            (
              SELECT  SUM(C.qun)
                FROM  boughtList C
               WHERE  C.BoughtHistoryId = A.id
            )													AS boughtQun
      FROM	boughtHistory	A
     INNER
      JOIN	users 			B
        ON	A.UserId = B.id
     WHERE  1 = 1
       AND  A.UserId = ${req.user.id}
       ${
         parseInt(status) === 4
           ? `AND A.status = ${status}`
           : `AND  A.status <= ${status}`
       }
            
     ORDER  BY A.createdAt DESC
    `;

    const selectQ2 = `
    SELECT	id,
            productName,
            price,
            qun,
            optionValue,
            etcOption,
            CONCAT(FORMAT(price, 0), "원") 			AS viewPrice,
            CONCAT(FORMAT((price * qun), 0), "원") 			AS viewCalcPrice,
            DATE_FORMAT(createdAt, '%Y%m%d')			    AS sortCreatedAt,
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
 * SUBJECT : 구매내역 상세 조회
 * PARAMETERS : { id }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/03
 */
router.post("/bought/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ1 = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
          A.id,
          A.deliveryCompany,
          A.deliveryNo,
          A.UserId,
          A.status,
          A.reason,
          A.returnAccountName,
          A.returnBankName,
          A.returnAccountNum,
          DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
          DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
          DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
          B.userId,
          B.username,
          B.email,
          B.mobile,
          B.point,
          A.post,
          A.adrs,
          A.dadrs,
          A.reason,
          A.returnAccountName,
          A.returnBankName,
          A.returnAccountNum,
          (
          	SELECT  SUM(C.price * C.qun)
          	  FROM  boughtList C
          	 WHERE  C.BoughtHistoryId = A.id
          )													AS boughtPrice,
          (
          	SELECT  SUM(C.qun)
          	  FROM  boughtList C
          	 WHERE  C.BoughtHistoryId = A.id
          )													AS boughtQun
    FROM	boughtHistory	A
   INNER
    JOIN	users 			B
      ON	A.UserId = B.id
   WHERE  1 = 1
     AND  A.id = ${id}
  `;

  const selectQ2 = `
  SELECT	id,
          productName,
          price,
          qun,
          optionValue,
          etcOption,
          CONCAT(FORMAT(price, 0), "원") 			AS viewPrice,
          CONCAT(FORMAT((price * qun), 0), "원") 			AS viewCalcPrice,
          DATE_FORMAT(createdAt, '%Y%m%d')			    AS sortCreatedAt,
          thumbnail,
          BoughtHistoryId 
    FROM	boughtList
  `;

  try {
    const list1 = await models.sequelize.query(selectQ1);
    const list2 = await models.sequelize.query(selectQ2);

    const result = consistOfArrayToArray(list1[0], list2[0], "BoughtHistoryId");

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 로드할 수 없습니다.");
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
  const { page } = req.body;

  const LIMIT = 6;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 6;

  try {
    const lengthQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.ProductId,
            B.thumbnail,
            B.name,
            B.subName,
            B.price,
            CONCAT(FORMAT(B.price, 0), "원") 			AS viewPrice,
            CONCAT(FORMAT(B.price - B.discount, 0), "원")  AS viewCalcPrice,
            B.detail,
            B.infoType,
            B.infoConsist,
            B.infoColor,
            B.infoSize,
            B.infoFrom,
            B.discount,
            CONCAT(FORMAT(B.discount, 0), "원") 			AS viewDiscount,
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
     WHERE  A.UserId = ${req.user.id}
     ORDER  BY A.createdAt DESC
    `;
    const selectQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.ProductId,
            B.thumbnail,
            B.name,
            B.subName,
            B.price,
            CONCAT(FORMAT(B.price, 0), "원") 			AS viewPrice,
            CONCAT(FORMAT(B.price - B.discount, 0), "원")  AS viewCalcPrice,
            B.detail,
            B.infoType,
            B.infoConsist,
            B.infoColor,
            B.infoSize,
            B.infoFrom,
            B.discount,
            CONCAT(FORMAT(B.discount, 0), "원") 			AS viewDiscount,
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
     WHERE  A.UserId = ${req.user.id}
     ORDER  BY A.createdAt DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}

    `;

    const lengths = await models.sequelize.query(lengthQuery);
    const result = await models.sequelize.query(selectQuery);

    const wishLen = lengths[0].length;

    const lastPage =
      wishLen % LIMIT > 0 ? wishLen / LIMIT + 1 : wishLen / LIMIT;

    return res.status(200).json({
      wishList: result[0],
      lastPage: parseInt(lastPage),
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 배송지 리스트
 * PARAMETERS :
 * ORDER BY : isBasic DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/address/list", isLoggedIn, async (req, res, next) => {
  const selectQuery = `
  SELECT  id,
          title,
          name,
          mobile,
      		post,
      		adrs,
      		dadrs,
      		isBasic
    FROM  address a
   WHERE  UserId = ${req.user.id}
   ORDER  BY  isBasic DESC
  `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 배송지 상세
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/03
 */

router.post("/address/isBasic", isLoggedIn, async (req, res, next) => {
  const selectQuery = `
  SELECT  id,
          title,
          name,
          mobile,
  		    post,
  		    adrs,
  		    dadrs,
  		    isBasic
    FROM  address a
   WHERE  UserId = ${req.user.id}
     AND  isBasic = 1
  `;
  try {
    const result = await models.sequelize.query(selectQuery);

    if (result[0].length === 0) {
      return res.status(400).send("배송지가 존재하지 없습니다.");
    }

    return res.status(200).json(result[0][0]);
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 배송지 추가
 * PARAMETERS : title,
 *              name,
 *              mobile,
 *              post,
 *              adrs,
 *              dadrs
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/address/create", isLoggedIn, async (req, res, next) => {
  const { title, name, mobile, post, adrs, dadrs, isBasic } = req.body;

  const userAddressQuery = `
  SELECT  id
    FROM  address
   WHERE  UserId = ${req.user.id}
     AND  isBasic = 1
  `;

  const insertQuery = `
  INSERT INTO address (
  	title,
  	name,
  	mobile,
  	post,
  	adrs,
  	dadrs,
  	isBasic,
  	createdAt,
  	updatedAt,
  	UserId
  )
  VALUES
  (
  	"${title}",
  	"${name}",
  	"${mobile}",
  	"${post}",
  	"${adrs}",
  	"${dadrs}",
  	${isBasic},
  	NOW(),
  	NOW(),
  	${req.user.id}
  )`;

  try {
    if (isBasic) {
      const findResult = await models.sequelize.query(userAddressQuery);

      if (findResult[0].length > 0) {
        return res.status(401).send("이미 기본주소로 설정된 주소가 있습니다.");
      }
    }

    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("데이터를 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 배송지 수정
 * PARAMETERS : id,
 *              title,
 *              name,
 *              mobile,
 *              post,
 *              adrs,
 *              dadrs
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/address/update", isLoggedIn, async (req, res, next) => {
  const { id, title, name, mobile, post, adrs, dadrs, isBasic } = req.body;

  const userAddressQuery = `
  SELECT  id
    FROM  address
   WHERE  UserId = ${req.user.id}
     AND  isBasic = 1
  `;

  const findQuery = `
  SELECT  id
    FROM  address
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  address
     SET  title = "${title}",
  		  name = "${name}",
  		  mobile = "${mobile}",
  		  post = "${post}",
  		  adrs = "${adrs}",
  		  dadrs = "${dadrs}",
  		  updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    if (isBasic) {
      const findResult = await models.sequelize.query(userAddressQuery);

      if (findResult[0].length > 0) {
        return res.status(400).send("이미 기본주소로 설정된 주소가 있습니다.");
      }
    }

    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("주소가 존재하지 않습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 기본 배송지 설정
 * PARAMETERS : id,
 *              isBasic
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/address/isBasicUpdate", isLoggedIn, async (req, res, next) => {
  const { id, isBasic } = req.body;

  const findQuery = `
  SELECT  id
    FROM  address
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  address
     SET  isBasic = ${isBasic}
   WHERE  id = ${id}
  `;

  const updateQuery2 = `
  UPDATE  address
     SET  isBasic = 0
   WHERE  UserId = ${req.user.id}
     AND  id != ${id}
   `;
  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(400).send("주소가 존재하지 않습니다.");
    }

    await models.sequelize.query(updateQuery2);
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 배송지 삭제
 * PARAMETERS : id,
 *              isBasic
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/06/02
 */

router.post("/address/delete", isLoggedIn, async (req, res, next) => {
  const { ids } = req.body;

  // ids : [1, 2, 3];

  if (!Array.isArray(ids)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      ids.map(async (data) => {
        const deleteQuery = `
        DELETE  
          FROM address
         WHERE id = ${data}
        `;

        await models.sequelize.query(deleteQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

module.exports = router;
