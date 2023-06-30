const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

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
 * SUBJECT : 배너 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/30
 */
router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

/**
 * SUBJECT : 배너 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/30
 */
router.post("/list", async (req, res, next) => {
  const selectQuery = `
    SELECT  A.id,
            A.imagePath,
            A.link,
            A.title,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
            B.username                                  AS updator
      FROM  mainDesign           A
      LEFT
     OUTER
      JOIN  users                B
        ON  A.updator = B.id
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("배너 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 데이터 생성
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/30
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
  INSERT    INTO    mainDesign
  (
    imagePath,
    link,
    title,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "http://via.placeholder.com/150",
    "/",
    "임시 제목",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 데이터 수정
 * PARAMETERS : id, imagePath, url, info
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/30
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, imagePath, link, title } = req.body;

  const updateQuery = `
      UPDATE    mainDesign
         SET    imagePath = "${imagePath}",
                link = "${link}",
                title = "${title}",
                updator = ${req.user.id},
                updatedAt = NOW()
       WHERE    id = ${id}
      `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 데이터 삭제
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/30
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQuery = `
      DELETE    
        FROM    mainDesign
       WHERE    id = ${id}
      `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 삭제할 수 없습니다.");
  }
});

module.exports = router;
