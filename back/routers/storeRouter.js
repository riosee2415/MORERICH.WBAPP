const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isLoggedIn = require("../middlewares/isLoggedIn");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const axios = require("axios");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * SUBJECT : 상품유형 가져오기
 * PARAMETERS : -
 * ORDER BY : 이름 순
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/list", async (req, res, next) => {
  const selectQuery = `
    SELECT	ROW_NUMBER() OVER(ORDER BY value ASC)           AS num,   
            A.id,
            A.value,
            A.isHide,
            DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            (
                SELECT	COUNT(id)
                    FROM	product
                WHERE	ProductTypeId = A.id
                  AND isDelete = 0
            )	AS	productCnt
     FROM	productType	A
    WHERE	1 = 1
      AND	A.isDelete = 0
    ORDER	BY value ASC
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형 통계 가져오기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/list2", async (req, res, next) => {
  const selectQuery = `
  SELECT	A.value,
            (
                SELECT	COUNT(id)
                    FROM	product
                WHERE	ProductTypeId = A.id
            )	AS	cnt
     FROM	productType	A
    WHERE	1 = 1
     AND	A.isDelete = 0
     AND A.isHide = 0
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형 숨기기
 * PARAMETERS : { targetId, nextFlag }
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/07/23
 */
router.post("/hideToggle", isAdminCheck, async (req, res, next) => {
  const { targetId, nextFlag } = req.body;

  //nextFlag 는 변경 될 값을 보내주세요. 현재 값이 아닙니다.

  const uq = `
    UPDATE  productType
       SET  isHide = ${nextFlag}
     WHERE  id = ${targetId}
  `;

  try {
    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("변경할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형 수정하기
 * PARAMETERS : {id, prevValue, nextValue}
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/modify", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const exQ = `
    SELECT  value
      FROM  productType
     WHERE  id = ${id}
  `;

  let prevValue = "";

  try {
    const ex = await models.sequelize.query(exQ);

    prevValue = ex[0][0].value;
  } catch (error) {
    console.error(error);
    return res.status(400).send("기존 데이터를 조회할 수 없습니다.");
  }

  const updateQuery = `
    UPDATE	productType
       SET	value = "${value}"
     WHERE	id = ${id} 
    `;

  const insertQuery = `
    INSERT INTO productTypeHistory (content, prevValue, nextValue, updator, createdAt, updatedAt) VALUES (
        "유형수정", "${prevValue}", "${value}", ${req.user.id}, NOW(), NOW()
        )
    `;

  try {
    const result1 = await models.sequelize.query(updateQuery);
    const result2 = await models.sequelize.query(insertQuery);

    if (result1[0].affectedRows > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).send("수정 할 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형 추가하기
 * PARAMETERS : { value }
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/new", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQuery1 = `
    INSERT INTO productType (value, createdAt, updatedAt) VALUES 
        ("${value}", NOW(), NOW())
    `;

  const insertQuery2 = `
    INSERT INTO productTypeHistory (content, prevValue, nextValue, updator, createdAt, updatedAt) VALUES (
        "유형추가", "${value}", "${value}", ${req.user.id}, NOW(), NOW()
        )
    `;

  try {
    const result1 = await models.sequelize.query(insertQuery1);
    await models.sequelize.query(insertQuery2);

    if (result1[1] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).send("데이터 추가에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자에 문의해주세요.");
  }
});

/**
 * SUBJECT : 상품유형 삭제하기
 * PARAMETERS : -
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQuery = `
    UPDATE	productType
       SET	isDelete = 1,
            deletedAt = NOW()
     WHERE	id = ${id} 
    `;

  const insertQuery2 = `
    INSERT INTO productTypeHistory (content, prevValue, nextValue, updator, createdAt, updatedAt) VALUES (
        "유형삭제", "${value}", "${value}", ${req.user.id}, NOW(), NOW()
        )
    `;

  try {
    const result1 = await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    if (result1[0].affectedRows > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).send("삭제 할 데이터를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 삭제할 수 없습니다.");
  }
});

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

const consistOfArrayToArray2 = (arr1, arr2, targetColumn) => {
  arr1.map((item) => {
    const tempArr = [];

    arr2.map((inItem) => {
      if (item.id === inItem[targetColumn]) {
        tempArr.push(inItem);
      }
    });

    item["options"] = tempArr;
  });

  return arr1;
};

const consistOfArrayToArray3 = (arr1, arr2, targetColumn) => {
  arr1.map((item) => {
    const tempArr = [];

    arr2.map((inItem) => {
      if (item.id === inItem[targetColumn]) {
        tempArr.push(inItem);
      }
    });

    item["options2"] = tempArr;
  });

  return arr1;
};

/**
 * SUBJECT : 상품 상세 가져오기
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/02
 */
router.post("/product/detail", async (req, res, next) => {
  const { id } = req.body;

  const sq1 = `
  SELECT	A.id,
          A.thumbnail,
          A.name,
          A.subName,
          A.price,
          CONCAT(FORMAT(A.price, 0), "원") 			AS viewPrice,
          CAST(A.price - A.discount AS signed integer)	AS calcPrice,
          CONCAT(FORMAT(A.price - A.discount, 0), "원")  AS viewCalcPrice,
          A.detail,
          A.infoType,
          A.infoConsist,
          A.infoColor,
          A.infoSize,
          A.infoFrom,
          A.discount,
          CONCAT(FORMAT(A.discount, 0), "원") 			AS viewDiscount,
          A.isNew,
          A.isBest,
          A.isRecomm,
          A.isStop,
          DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
          DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
          DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
          ${
            req.user
              ? ` (
              SELECT	id
                FROM	wish	Z
               WHERE	Z.UserId = ${req.user.id}
                 AND	A.id = Z.ProductId 
            )	AS exWish`
              : `(
              SELECT	null
                FROM	dual
            )	AS exWish`
          }
    FROM	product		A
   WHERE	A.isDelete = 0
     AND  A.id = ${id}
  `;

  const sq2 = `
  SELECT	ProductId,
          filepath 
    FROM	productImage
   WHERE  ProductId = ${id}
  `;

  const sq3 = `
  SELECT	
  id,
      value,
        ProductId
  FROM 	productOption
 WHERE	ProductId = ${id}
  `;

  const sq4 = `
  SELECT	
  id,
      value,
        ProductId
  FROM 	productOption2
 WHERE	ProductId = ${id}
  `;

  try {
    const list1 = await models.sequelize.query(sq1);
    const list2 = await models.sequelize.query(sq2);
    const list3 = await models.sequelize.query(sq3);
    const list4 = await models.sequelize.query(sq4);

    const result = await consistOfArrayToArray(list1[0], list2[0], "ProductId");
    const result2 = await consistOfArrayToArray2(result, list3[0], "ProductId");
    const result3 = await consistOfArrayToArray3(
      result2,
      list4[0],
      "ProductId"
    );

    return res.status(200).json(result3[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 가져오기
 * PARAMETERS : {sName, isNew, isBest, isRecomm, ProductTypeId}
 * ORDER BY : 등록일 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/product/list", async (req, res, next) => {
  const {
    sName = "",
    isNew = false,
    isBest = false,
    isRecomm = false,
    isStop = false,
    ProductTypeId,
    ProductType2Id = false,
    orderType = 1,
  } = req.body;

  // orderType = 1 > 최신순 (디폴트)
  // orderType = 2 > 가격 낮은 순
  // orderType = 3 > 가격 높은 순

  const _ProductTypeId = ProductTypeId === 0 ? false : ProductTypeId;

  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC)        AS num,
            A.id,
            A.thumbnail,
            A.name,
            A.subName,
            A.price,
            CONCAT(FORMAT(A.price, 0), "원") 			AS viewPrice,
            CONCAT(FORMAT(A.price - A.discount, 0), "원")  AS viewCalcPrice,
            A.detail,
            A.infoType,
            A.infoConsist,
            A.infoColor,
            A.infoSize,
            A.infoFrom,
            A.discount,
            CONCAT(FORMAT(A.discount, 0), "원") 			AS viewDiscount,
            A.isNew,
            A.isBest,
            A.isRecomm,
            A.isStop,
            DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            A.ProductTypeId,
            A.ProductType2Id,
            B.value,
            IFNULL(C.value, "-" )   as value2,
            ${
              req.user
                ? ` (
                SELECT	id
                  FROM	wish	Z
                 WHERE	Z.UserId = ${req.user.id}
                   AND	A.id = Z.ProductId 
              )	AS exWish`
                : `(
                SELECT	null
                  FROM	dual
              )	AS exWish`
            }
     FROM	product			A
    INNER	
     JOIN	productType		B
       ON	A.ProductTypeId = B.id
       LEFT
       OUTER
        JOIN 		productType2 			C
          ON		A.ProductType2Id = C.id
    WHERE	1 = 1
      AND	A.isDelete = 0
      AND	A.name LIKE "%${sName}%"
      ${_ProductTypeId ? `AND  A.ProductTypeId = ${_ProductTypeId}` : ""}
      ${ProductType2Id ? `AND  A.ProductType2Id = ${ProductType2Id}` : ""}
      ${isNew ? `AND	A.isNew = ${isNew}` : ""}
      ${isBest ? `AND	A.isBest = ${isBest}` : ""}
      ${isRecomm ? `AND	A.isRecomm = ${isRecomm}` : ""}
      ${isStop ? `AND	A.isStop = ${isStop}` : ""}

      ${parseInt(orderType) === 1 ? `ORDER   BY  A.createdAt DESC` : ""}
      ${parseInt(orderType) === 2 ? `ORDER   BY  A.price ASC` : ""}
      ${parseInt(orderType) === 3 ? `ORDER   BY  A.price DESC` : ""}
    
  `;

  const selectQ2 = `
        SELECT	id,
                filepath,
                ProductId 
          FROM	productImage
         ORDER  BY  createdAt ASC
`;

  const selectQ3 = `
  SELECT 	ROW_NUMBER() OVER(ORDER BY value ASC)        AS num,
            id,
            value,
            ProductId
    FROM	productOption
   ORDER    BY  value ASC
`;

  const selectQ4 = `
SELECT 	ROW_NUMBER() OVER(ORDER BY value ASC)        AS num,
          id,
          value,
          ProductId
  FROM	productOption2
 ORDER    BY  value ASC
`;

  try {
    const list1 = await models.sequelize.query(selectQ);
    const list2 = await models.sequelize.query(selectQ2);
    const list3 = await models.sequelize.query(selectQ3);
    const list4 = await models.sequelize.query(selectQ4);

    const result = consistOfArrayToArray(list1[0], list2[0], "ProductId");
    const result2 = consistOfArrayToArray2(result, list3[0], "ProductId");
    const result3 = await consistOfArrayToArray3(
      result2,
      list4[0],
      "ProductId"
    );

    return res.status(200).json(result3);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 통계 가져오기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/product/list2", isAdminCheck, async (req, res, next) => {
  const selectQ = `
    SELECT	B.value,
            COUNT(A.id)	AS cnt
     FROM	product 	A
    INNER
     JOIN	productType B
       ON	A.ProductTypeId = B.id
    WHERE A.isDelete = 0
    GROUP	BY	A.ProductTypeId
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("통계를 로드할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 토글
 * PARAMETERS : {id, nextFlag, type}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/product/toggle", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag, type } = req.body;

  const uq1 = `
        UPDATE  product
           SET  isNew = ${nextFlag},
                updatedAt = NOW()
         WHERE  id = ${id}
    `;

  const uq2 = `
        UPDATE  product
           SET  isBest = ${nextFlag},
                updatedAt = NOW()
         WHERE  id = ${id}`;

  const uq3 = `
        UPDATE  product
           SET  isRecomm = ${nextFlag},
                updatedAt = NOW()
         WHERE  id = ${id}`;

  const uq4 = `
        UPDATE  product
           SET  isStop = ${nextFlag},
                updatedAt = NOW()
         WHERE  id = ${id}`;

  try {
    if (type === "new") await models.sequelize.query(uq1);
    if (type === "best") await models.sequelize.query(uq2);
    if (type === "recomm") await models.sequelize.query(uq3);
    if (type === "stop") await models.sequelize.query(uq4);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 정보 업데이트 (썸네일 제외)
 * PARAMETERS : {
 *  ProductTypeId,
    detail,
    discount,
    id,
    infoColor,
    infoConsist,
    infoFrom,
    infoSize,
    infoType,
    isBest,
    isNew,
    isRecomm,
    name,
    num,
    price,
    subName
 * }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */

router.post("/product/update", isAdminCheck, async (req, res, next) => {
  const {
    ProductTypeId,
    ProductType2Id,
    detail,
    discount,
    id,
    infoColor,
    infoConsist,
    infoFrom,
    infoSize,
    infoType,
    isBest,
    isNew,
    isRecomm,
    name,
    price,
    subName,
  } = req.body;

  const updateQ = `
    UPDATE  product
       SET  ProductTypeId = ${ProductTypeId},
            ProductType2Id = ${ProductType2Id},
            detail = "${detail}",
            discount = ${discount},
            infoColor = "${infoColor}",
            infoConsist = "${infoConsist}",
            infoFrom = "${infoFrom}",
            infoSize = "${infoSize}",
            infoType = "${infoType}",
            isBest = ${isBest},
            isNew = ${isNew},
            isRecomm = ${isRecomm},
            name = "${name}",
            price = ${price},
            subName = "${subName}",
            updatedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품정보를 수정할 수 없습니다.");
  }
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post(
  "/images",
  isAdminCheck,
  upload.array("image"),
  async (req, res, next) => {
    return res.json(req.files);
  }
);

/**
 * SUBJECT : 상품 썸네일 적용
 * PARAMETERS : {id,thumbnailPath}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/product/thup", isAdminCheck, async (req, res, next) => {
  const { id, thumbnailPath } = req.body;

  const updateQ = `
        UPDATE  product
           SET  thumbnail = "${thumbnailPath}",
                updatedAt = NOW()
         WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("썸네일을 업로드할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 상세이미지 추가
 * PARAMETERS : {ProductId, filepath}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/product/detailImage", isAdminCheck, async (req, res, next) => {
  const { ProductId, filepath } = req.body;

  const insertQ = `
    INSERT INTO productImage (filepath, createdAt, updatedAt, ProductId) VALUES (
	"${filepath}", NOW(), NOW(), ${ProductId}
        )
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("이미지를 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 상세이미지 삭제
 * PARAMETERS : { id }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/detail/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const dq = `
        DELETE FROM productImage
         WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(dq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("이미지를 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 상세이미지 생성
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/product/new", isAdminCheck, async (req, res, next) => {
  const exQ = `
    SELECT  id
    FROM  productType
  WHERE isDelete = 0
    `;

  let cateId = 1;

  try {
    const list = await models.sequelize.query(exQ);

    cateId = list[0][0].id;
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품을 등록할 수 없습니다.");
  }

  const insertQ = `
INSERT INTO product (name, thumbnail, subName, price, detail, infoType, infoSize, infoConsist, infoColor, infoFrom, createdAt, updatedAt, ProductTypeId) VALUES 
("New Product", "https://via.placeholder.com/300x300?text=Upload Thumbnail", "상품 부제를 입력해주세요.", 0, "상품설명을 입력해주세요.", "상품 분류를 입력해주세요.", "상품 규격을 입력해주세요.", "상품 재질을 입력해주세요.", "색상정보를 입력해주세요.", "원산지를 입력해주세요.", NOW() ,NOW(), ${cateId});
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 삭제
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/product/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const uq = `
        UPDATE  product
           SET  isDelete = 1,
                deletedAt = NOW()
         WHERE  id = ${id}
    `;

  try {
    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 옵션 추가
 * PARAMETERS : {ProductId, value}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/option/new", isAdminCheck, async (req, res, next) => {
  const { value, ProductId } = req.body;

  const insertQ = `
INSERT INTO productOption (value, createdAt, updatedAt, ProductId) VALUES (
	"${value}", NOW(), NOW(), ${ProductId}
)
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 옵션 삭제
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/option/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
        DELETE FROM productOption
           WHERE id = ${id}
    `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 옵션2 추가
 * PARAMETERS : {ProductId, value}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 선임개발자 김동현
 * DEV DATE : 2023/07/07
 */
router.post("/option2/new", isAdminCheck, async (req, res, next) => {
  const { value, ProductId } = req.body;

  const insertQ = `
INSERT INTO productOption2 (value, createdAt, updatedAt, ProductId) VALUES (
	"${value}", NOW(), NOW(), ${ProductId}
)
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 옵션2 삭제
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 선임개발자 김동현
 * DEV DATE : 2023/07/07
 */
router.post("/option2/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
        DELETE FROM productOption2
           WHERE id = ${id}
    `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 위시리스트 차트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/wishchart", isAdminCheck, async (req, res, next) => {
  const sq = `
        SELECT	B.name			AS value,
                COUNT(B.id)		AS cnt
          FROM	wish	A
          LEFT
         OUTER
          JOIN	product B
            ON	A.ProductId = B.id
         GROUP	BY	B.name
    `;

  try {
    const list = await models.sequelize.query(sq);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 로드할 수 없습니다.");
  }
});

/**
 * SUBJECT : 구매내역 조회
 * PARAMETERS : { searchId, searchDate, stat }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/boughtlist", isAdminCheck, async (req, res, next) => {
  const { searchId = "", searchDate = false, stat = 0 } = req.body;

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
          B.point,
          A.post,
          A.adrs,
          A.dadrs,
          A.reason,
          A.returnAccountName,
          A.returnBankName,
          A.returnAccountNum,
          A.payType,
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
     AND  B.userId LIKE "%${searchId}%"
     AND  A.status = ${stat}
     ${
       searchDate
         ? `AND  DATE_FORMAT(A.createdAt, "%Y-%m-%d") = "${searchDate}"`
         : ""
     }
  `;

  const selectQ2 = `
  SELECT	id,
          productName,
          price,
          qun,
          CONCAT(FORMAT(price, 0), "원") 			AS viewPrice,
          optionValue,
          etcOption,
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
 * SUBJECT : 구매내역 조회
 * PARAMETERS : { searchId, searchDate, stat }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/01
 */
router.post("/boughtlist/target", isAdminCheck, async (req, res, next) => {
  const { targetId } = req.body;

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
          B.point,
          A.post,
          A.adrs,
          A.dadrs,
          A.reason,
          A.returnAccountName,
          A.returnBankName,
          A.returnAccountNum,
          A.payType,
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
     AND  A.id = ${targetId}
  `;

  const selectQ2 = `
  SELECT	id,
          productName,
          price,
          qun,
          CONCAT(FORMAT(price, 0), "원") 			AS viewPrice,
          optionValue,
          etcOption,
          thumbnail,
          BoughtHistoryId 
    FROM	boughtList
   WHERE  BoughtHistoryId = ${targetId}
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
 * SUBJECT : 상품 구매하기
 * PARAMETERS : post,
                adrs,
                dadrs,
                boughtLists,
                payType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/02
 */
router.post("/boughtCreate", isLoggedIn, async (req, res, next) => {
  const { post, adrs, dadrs, boughtLists, payType } = req.body;

  if (!Array.isArray(boughtLists)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const insertQuery = `
  INSERT  INTO  boughtHistory
  (
    post,
    adrs,
    dadrs,
    UserId,
    payType,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${post}",
    "${adrs}",
    "${dadrs}",
    ${req.user.id},
    ${payType},
    NOW(),
    NOW()
  )
  `;

  try {
    const insertResult = await models.sequelize.query(insertQuery);

    // (금액/할인)
    await Promise.all(
      boughtLists.map(async (data) => {
        const insertQuery2 = `
        INSERT  INTO  boughtList
        (
          productName,
          price,
          qun,
          optionValue,
          etcOption,
          thumbnail,
          BoughtHistoryId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          "${data.productName}",
          ${data.price},
          ${data.qun},
          "${data.optionValue}",
          "${data.etcOption}",
          "${data.thumbnail}",
          ${insertResult[0].insertId},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery2);
      })
    );

    const boughtHistoryId = insertResult[0].insertId;

    return res
      .status(201)
      .json({ result: true, boughtHistoryId: boughtHistoryId });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 구매할 수 없습니다.");
  }
});

/**
 * SUBJECT : 주문내역 상태 변환
 * PARAMETERS : {id, stat}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/02
 */
router.post("/bought/stat/update", isAdminCheck, async (req, res, next) => {
  const { id, stat, mobile, productName } = req.body;

  const uq = `
    UPDATE  boughtHistory
       SET  status = ${stat},
            updatedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    if (stat === 1) {
      const timestampData = moment().format("x");
      const uri = process.env.MESSAGE_URI;
      const secretKey = process.env.MESSAGE_SECRET_KEY;
      const accessKey = process.env.MESSAGE_ACCESS_KEY;
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
      const url2 = `/sms/v2/services/${uri}/messages`;

      let hmac = await CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        secretKey
      );
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(timestampData);
      hmac.update(newLine);
      hmac.update(accessKey);

      let hash = hmac.finalize();

      const signature = hash.toString(CryptoJS.enc.Base64);

      await axios({
        method: method,
        json: true,
        url: url,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": `${timestampData}`,
          "x-ncp-iam-access-key": `${accessKey}`,
          "x-ncp-apigw-signature-v2": `${signature}`,
        },
        data: {
          type: "LMS",
          from: "01036531805",
          subject: "모어리치",
          content: `안녕하세요.
MoreRich 입니다.
주문하신 ${productName} 상품 접수가 완료 되었습니다.
                    
배송이 출발하면 송장 문자로 남겨드리겠습니다.
                    
이용해주셔서 감사합니다. 
https://morerich.co.kr/`,
          messages: [
            {
              to: mobile.replace(/\-/gi, ""),
              // subject: "string",
              // content: "string",
            },
          ],
          // files: [
          //   {
          //     name: "string",
          //     body: "string",
          //   },
          // ],
        },
      });
    }

    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("주문상태를 변경할 수 없습니다.");
  }
});

/**
 * SUBJECT : 주문내역 배송지 수정
 * PARAMETERS : { id, deliveryCompany, deliveryNo }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/02
 */
router.post("/bought/stat/update2", isAdminCheck, async (req, res, next) => {
  const { id, deliveryCompany, deliveryNo, mobile } = req.body;

  const uq = `
    UPDATE  boughtHistory
       SET  deliveryCompany = "${deliveryCompany}",
            deliveryNo = "${deliveryNo}",
            updatedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    const timestampData = moment().format("x");
    const uri = process.env.MESSAGE_URI;
    const secretKey = process.env.MESSAGE_SECRET_KEY;
    const accessKey = process.env.MESSAGE_ACCESS_KEY;
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;

    let hmac = await CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestampData);
    hmac.update(newLine);
    hmac.update(accessKey);

    let hash = hmac.finalize();

    const signature = hash.toString(CryptoJS.enc.Base64);

    await axios({
      method: method,
      json: true,
      url: url,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": `${timestampData}`,
        "x-ncp-iam-access-key": `${accessKey}`,
        "x-ncp-apigw-signature-v2": `${signature}`,
      },
      data: {
        type: "LMS",
        from: "01036531805",
        subject: "모어리치",
        content: `안녕하세요.
MoreRich 입니다.
배송이 출발하여 송장번호 남겨드리겠습니다.
${deliveryNo}                
이용해주셔서 감사합니다. 
https://morerich.co.kr/`,
        messages: [
          {
            to: mobile.replace(/\-/gi, ""),
            // subject: "string",
            // content: "string",
          },
        ],
        // files: [
        //   {
        //     name: "string",
        //     body: "string",
        //   },
        // ],
      },
    });

    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("배송정보를 변경할 수 없습니다.");
  }
});

/**
 * SUBJECT : 취소/환불 신청
 * PARAMETERS : id, reason, returnAccountName, returnBankName, returnAccountNum
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/02
 */
router.post("/bought/cancel", isLoggedIn, async (req, res, next) => {
  const { id, reason, returnAccountName, returnBankName, returnAccountNum } =
    req.body;

  const cancalQuery = `
    UPDATE  boughtHistory
       SET  updatedAt = NOW(),
            status = 4,
            reason = "${reason}",
            returnAccountName = "${returnAccountName}",
            returnBankName = "${returnBankName}",
            returnAccountNum = "${returnAccountNum}"
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(cancalQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("취소/환불 신청을 진행할 수 없습니다.");
  }
});

/**
 * SUBJECT : 취소/환불 처리
 * PARAMETERS : { id, reason }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/06/02
 */
router.post("/bought/cancel", isAdminCheck, async (req, res, next) => {
  const { id, reason } = req.body;

  const uq = `
    UPDATE  boughtHistory
       SET  updatedAt = NOW(),
            reason = "${reason}",
            status = 4
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("배송정보를 변경할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형2 가져오기
 * PARAMETERS : { TypeId }
 * ORDER BY : 이름 순
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/07/08
 */
router.post("/list3", async (req, res, next) => {
  const { TypeId } = req.body;

  if (!TypeId) {
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }

  const selectQuery = `
    SELECT	ROW_NUMBER() OVER(ORDER BY value ASC)           AS num,   
            A.id,
            A.value,
            DATE_FORMAT(A.createdAt, '%Y. %m. %d')			AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, '%Y%m%d')			    AS sortCreatedAt,
            DATE_FORMAT(A.updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
            DATE_FORMAT(A.updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
            ProductTypeId
     FROM	productType2	A
    WHERE	1 = 1
      AND	A.isDelete = 0
      AND ProductTypeId = ${TypeId}
    ORDER	BY value ASC
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형2 수정하기
 * PARAMETERS : { id, value }
 * ORDER BY : 이름 순
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/07/08
 */
router.post("/modify3", async (req, res, next) => {
  const { id, value } = req.body;

  if (!id) {
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }

  if (!value) {
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
  const uq = `
    UPDATE  productType2
       SET  value = "${value}",
            updatedAt = NOW()
      WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(uq);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품유형2 추가하기
 * PARAMETERS : { value }
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/new3", isAdminCheck, async (req, res, next) => {
  const { value, ProductTypeId } = req.body;

  const insertQuery1 = `
    INSERT INTO productType2 (value, createdAt, updatedAt, ProductTypeId) VALUES 
        ("${value}", NOW(), NOW(), ${ProductTypeId})
    `;

  try {
    const result1 = await models.sequelize.query(insertQuery1);

    if (result1[1] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(400).send("데이터 추가에 실패했습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자에 문의해주세요.");
  }
});

/**
 * SUBJECT : 상품유형2 삭제하기
 * PARAMETERS : -
 * ORDER BY : SORT 기준
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/05/31
 */
router.post("/delete3", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE	productType2
       SET	isDelete = 1,
            deletedAt = NOW()
     WHERE	id = ${id} 
    `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 삭제할 수 없습니다.");
  }
});

module.exports = router;
