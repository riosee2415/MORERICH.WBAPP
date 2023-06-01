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
router.post("/type/list", async (req, res, next) => {
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
router.post("/type/create", isAdminCheck, async (req, res, next) => {
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
    ${req.user.id},
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
router.post("/type/update", isAdminCheck, async (req, res, next) => {
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
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

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
/**
 * SUBJECT : 자주묻는질문 목록
 * PARAMETERS : page, FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)		  AS num,
          A.id,
          A.question,
          A.answer,
          A.createdAt,
          A.isUse,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          A.FaqTypeId
    FROM 	faq   A 
   INNER	
    JOIN	faqType   B 
      ON	A.FaqTypeId = B.id
    LEFT
   OUTER
    JOIN	users	C
      ON	A.updator = C.id
   WHERE 	A.isDelete = 0
   ORDER  BY num DESC 
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;
  try {
    const lengths = await models.sequelize.query(selectQuery);
    const faqLen = lengths[0].length;

    const lastpage = faqLen % LIMIT > 0 ? faqLen / LIMIT + 1 : faqLen / LIMIT;
    return res
      .status(200)
      .json({ faqs: lengths[0], lastpage: parseInt(lastpage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 목록을 불러올 수 없습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 목록 [관리자]
 * PARAMETERS : FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { FaqTypeId } = req.body;

  const _FaqTypeId = FaqTypeId ? FaqTypeId : false;

  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)		  AS num,
          A.id,
          A.question,
          A.answer,
          A.createdAt,
          A.isUse,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          A.FaqTypeId,
          B.value,
          C.username 										               AS updator
    FROM 	faq   A 
    INNER	
    JOIN	faqType   B 
      ON	A.FaqTypeId = B.id
    LEFT
    OUTER
     JOIN	users	C
       ON	A.updator = C.id
    WHERE A.isDelete = 0
          ${_FaqTypeId ? `AND A.FaqTypeId = ${_FaqTypeId}` : ``}
    ORDER BY num DESC 

  `;
  try {
    const faq = await models.sequelize.query(selectQuery);

    return res.status(200).json(faq[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 자주묻는질문 생성
 * PARAMETERS : FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const { FaqTypeId } = req.body;

  const insertQuery = `
  INSERT  INTO  faq
  (
    question,
    answer,
    FaqTypeId,
    createdAt,
    updatedAt,
    updator
  )
  VALUES
  (
    "임시 FAQ",
    "임시 FAQ 답변입니다. 내용을 입력해주세요.",
    ${FaqTypeId},
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;
  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문을 생성할 수 없습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 수정
 * PARAMETERS : id, question, answer, FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, question, answer, FaqTypeId } = req.body;

  const updateQuery = `
  UPDATE  faq
     SET  question = "${question}",
          answer = "${answer}",
          FaqTypeId = ${FaqTypeId},
          updatedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문을 수정할 수 없습니다.");
  }
});
/**
 * SUBJECT : 자주묻는질문 삭제
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/06/01
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQuery = `
  UPDATE  faq
     SET  isDelete = 1,
          deletedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문을 삭제할 수 없습니다.");
  }
});
module.exports = router;
