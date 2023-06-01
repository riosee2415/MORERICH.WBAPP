const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// TYPE ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 자주묻는질문 유형 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("type/list", async (req, res, next) => {
  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)		  AS num,
          A.id,
          A.value,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt
    FROM 	faqType   A
   WHERE	isDelete = 0
   ORDER BY num DESC 
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send("자주묻는질문 유형 데이터를 조회할 수 없습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 유형 생성
 * PARAMETERS : value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("type/create", async (req, res, next) => {
  const { value } = req.body;

  const insertQuery = `
  INSERT INTO faqType 
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${value}",
    1,
    NOW(),
    NOW()
  )
  `;
  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는 질문 유형을 생성할 수 잆습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 유형 수정
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQuery = `
  UPDATE	faqType 
     SET  value = "${value}",
          updatedAt = NOW(),
          updator = ${req.user.id}
   WHERE	id = ${id}
  `;
  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 수정할 수 없습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 유형 삭제
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const deleteQuery = `
  UPDATE	faqType 
     SET  isDelete = 1,
          updatedAt = NOW(),
          deletedAt = NOW(),
          updator = ${req.user.id}
   WHERE	id = ${id}
  `;
  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 삭제할 수 없습니다.");
  }
});
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// FAQ ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

module.exports = router;
