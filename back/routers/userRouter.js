const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const axios = require("axios");

const router = express.Router();

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchData, searchLevel, searchExit } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
          id,
          userId,
          email,
          username,
          nickname,
          mobile,
          point,
          pointPer,
          level,
          isExit,
          CASE
            WHEN	level = 1	THEN "일반회원"
            WHEN	level = 2	THEN "비어있음"
            WHEN	level = 3	THEN "운영자"
            WHEN	level = 4	THEN "최고관리자"
            WHEN	level = 5	THEN "개발사"
          END											AS viewLevel,
          terms,
          createdAt,
          updatedAt,
          exitedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
		      DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt
    FROM	users
   WHERE	CONCAT(username, email) LIKE '%${_searchData}%'
          ${
            _searchLevel === parseInt(0)
              ? ``
              : _searchLevel === 1
              ? `AND level = 1`
              : _searchLevel === 3
              ? `AND level = 3`
              : _searchLevel === 4
              ? `AND level = 4`
              : _searchLevel === 5
              ? `AND level = 5`
              : ``
          } 
          AND	isExit = ${_searchExit}
   ORDER	BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
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

// 권한메뉴 관리자 리스트
router.post("/adminList", async (req, res, next) => {
  const { username, type } = req.body;

  // Validate
  const _username = username ? username : "";

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
          id,
          username,
          userId,
          email,
          level,
          mobile,
          point,
          pointPer,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS updatedAt,
          DATE_FORMAT(exitedAt, "%Y년 %m월 %d일") AS viewExitedAt,
          menuRight1,
          menuRight2,
          menuRight3,
          menuRight4,
          menuRight5,
          menuRight6,
          menuRight7,
          menuRight8,
          menuRight9,
          menuRight10,
          menuRight11,
          menuRight12
    FROM	users  
   WHERE	1 = 1
     AND  username LIKE "${_username}%"
     AND  level LIKE 5
   ORDER  BY createdAt DESC
  `;

  const selectQuery2 = `
  SELECT 	id,
          post,
          adrs,
          dadrs,
          isBasic,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, '%Y. %m. %d')			AS viewCreatedAt,
          DATE_FORMAT(createdAt, '%Y%m%d')			    AS sortCreatedAt,
          DATE_FORMAT(updatedAt, '%Y. %m. %d')			AS viewUpdatedAt,
          DATE_FORMAT(updatedAt, '%Y%m%d')			    AS sortUpdatedAt,
          UserId 
    FROM 	address
  `;

  try {
    const result = await models.sequelize.query(selectQuery);
    const result2 = await models.sequelize.query(selectQuery2);

    const final = consistOfArrayToArray(result[0], result2[0], "UserId");

    return res.status(200).json(final);
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자 정보를 불러올 수 없습니다.");
  }
});

// 관리자 메뉴 권한 제어
router.post("/update/menuRight", async (req, res, next) => {
  const { userId, type, status } = req.body;

  let inQuery = "";

  switch (parseInt(type)) {
    case 1:
      inQuery = `SET  menuRight1 =  ${status}`;
      break;

    case 2:
      inQuery = `SET  menuRight2 =  ${status}`;
      break;

    case 3:
      inQuery = `SET  menuRight3 =  ${status}`;
      break;

    case 4:
      inQuery = `SET  menuRight4 =  ${status}`;
      break;

    case 5:
      inQuery = `SET  menuRight5 =  ${status}`;
      break;

    case 6:
      inQuery = `SET  menuRight6 =  ${status}`;
      break;

    case 7:
      inQuery = `SET  menuRight7 =  ${status}`;
      break;

    case 8:
      inQuery = `SET  menuRight8 =  ${status}`;
      break;

    case 9:
      inQuery = `SET  menuRight9 =  ${status}`;
      break;

    case 10:
      inQuery = `SET  menuRight10 =  ${status}`;
      break;

    case 11:
      inQuery = `SET  menuRight11 =  ${status}`;
      break;

    case 12:
      inQuery = `SET  menuRight12 =  ${status}`;
      break;

    default:
      break;
  }

  const updateQuery = `
    UPDATE  users
       ${inQuery}
     WHERE  id = ${userId}
  `;

  const insertQuery2 = `
  INSERT INTO adminUserRightHistorys (returnId, memo, createdAt, updatedAt) VALUES 
  (
    "${userId}",
    "${
      type === 1
        ? `통계관리`
        : type === 2
        ? `기초정보관리`
        : type === 3
        ? `배너관리`
        : type === 4
        ? `게시판관리`
        : type === 5
        ? `회원관리`
        : type === 6
        ? `고객지원관리`
        : type === 7
        ? `기록관리`
        : type === 8
        ? `DIY관리`
        : type === 9
        ? `ERROR`
        : type === 10
        ? `ERROR`
        : type === 11
        ? `ERROR`
        : type === 12
        ? `ERROR`
        : `ERROR`
    } ${status === 1 ? `ON` : status === 0 ? `OFF` : `ERROR`}",
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("관리자 권한을 제어할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	userHistory		A
     INNER
      JOIN	users 			  B
        ON	A.updator = B.id
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

router.post(
  "/adminUserRight/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const { datePick } = req.body;

    const _datePick = datePick ? datePick : null;

    const selectQuery = `
    SELECT 	A.id,
            A.returnId,
            A.memo,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	adminUserRightHistorys		A

     INNER
      JOIN	users 			B
        ON	A.returnId = B.id
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

    try {
      const result = await models.sequelize.query(selectQuery);

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      return res.status(400).send("데이터를 불러올 수 없습니다.");
    }
  }
);

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: [
          "id",
          "userId",
          "point",
          "pointPer",
          "nickname",
          "email",
          "mobile",
          "level",
          "isExit",
          "username",
          "menuRight1",
          "menuRight2",
          "menuRight3",
          "menuRight4",
          "menuRight5",
          "menuRight6",
          "menuRight7",
          "menuRight8",
          "menuRight9",
          "menuRight10",
          "menuRight11",
          "menuRight12",
        ],
      });

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: [
          "id",
          "userId",
          "nickname",
          "email",
          "level",
          "point",
          "isExit",
          "pointPer",
          "username",
          "mobile",
          "menuRight1",
          "menuRight2",
          "menuRight3",
          "menuRight4",
          "menuRight5",
          "menuRight6",
          "menuRight7",
          "menuRight8",
          "menuRight9",
          "menuRight10",
          "menuRight11",
          "menuRight12",
        ],
      });

      if (fullUserWithoutPassword.isExit) {
        return res.status(400).send("탈퇴한 회원 입니다.");
      }

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: [
          "id",
          "userId",
          "nickname",
          "point",
          "pointPer",
          "email",
          "level",
          "username",
          "mobile",
          "isExit",
          "menuRight1",
          "menuRight2",
          "menuRight3",
          "menuRight4",
          "menuRight5",
          "menuRight6",
          "menuRight7",
          "menuRight8",
          "menuRight9",
          "menuRight10",
          "menuRight11",
          "menuRight12",
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const { userId, email, username, nickname, mobile, password, terms } =
    req.body;

  if (!terms) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  try {
    const exUser = await User.findOne({
      where: { userId: userId },
    });

    if (exUser) {
      return res.status(401).send("이미 가입된 아이디 입니다.");
    }

    const exUserEmail = await User.findOne({
      where: { email: email },
    });

    if (exUserEmail) {
      return res.status(401).send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // 신규가입 시 데이터 가져오기

    const pq = `
    SELECT	point,
            pointPer 
      FROM	joinSet
    `;

    const joinsetData = await models.sequelize.query(pq);

    const result = await User.create({
      userId,
      email,
      username,
      nickname: userId,
      mobile,
      terms,
      password: hashedPassword,
      point: joinsetData[0][0].point,
      pointPer: joinsetData[0][0].pointPer,
    });

    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const { password, mobile, email } = req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(req.user.id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateQuery = `
    UPDATE  users  
       SET  password = "${hashedPassword}",
            mobile = "${mobile}",
            email = "${email}"
    WHERE  id = ${req.user.id}
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

router.post("/findId", async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        username,
        email,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(200).json({ userId: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

router.post("/modifypass", async (req, res, next) => {
  const { email, userId } = req.body;

  const findUserQuery = `
  SELECT  id,
          email
    FROM  users
   WHERE  userId = "${userId}"
     AND  email = "${email}"
  `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }

    const UUID = generateUUID();

    const userUpdateQuery = `
    UPDATE  users
       SET  secret = "${UUID}"
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    await sendSecretMail(
      email,
      `🔐 [보안 인증코드 입니다.] MoreRich에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
      `
          <div>
            <h3>BMM</h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. BMM 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

router.post("/checkSecret", async (req, res, next) => {
  const { secret } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  secret = "${secret}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.post("/modifypass/update", async (req, res, next) => {
  const { userId, password } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const userUpdateQuery = `
    UPDATE  users
       SET  password = "${hashPassord}",
            updatedAt = NOW(),
            secret = NULL
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  const findUserQuery = `
  SELECT  level
    FROM  users
   WHERE  id = ${selectUserId}
  `;

  try {
    const userData = await models.sequelize.query(findUserQuery);

    if (userData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const currentLevel = parseInt(userData[0][0].level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateQuery = `
    UPDATE  users
       SET  level = ${changeLevel},
            updatedAt = NOW()
     WHERE  id = ${selectUserId}
    `;

    const insertQuery = `
    INSERT  INTO  userHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "권한 수정",
      "${
        changeLevel === 1
          ? `일반회원`
          : changeLevel === 2
          ? `비어있음`
          : changeLevel === 3
          ? `운영자`
          : changeLevel === 4
          ? `최고관리자`
          : `일반회원`
      }",
      ${req.user.id},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

router.post("/exit/update/true", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
      UPDATE users
         SET isExit = TRUE
           exitedAt = NOW()
       WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.post("/exit/update/false", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE  users
       SET  isExit = FALSE
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.post("/getJoinSet", async (req, res, next) => {
  const sq = `
  SELECT  id,
          point,
          pointPer,
          DATE_FORMAT(updatedAt, '%Y. %m. %d')			AS viewUpdatedAt
    FROM joinSet
  `;

  try {
    const list = await models.sequelize.query(sq);

    return res.status(200).json(list[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터 로드 실패");
  }
});

router.post("/upJoinSet", async (req, res, next) => {
  const { id, point, pointPer } = req.body;

  const up = `
  UPDATE  joinSet
     SET  point = ${point},
          pointPer = ${pointPer}
   WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(up);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터 로드 실패");
  }
});

/**
 * SUBJECT : 회원탈퇴
 * PARAMETERS : password
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/03/07
 */
router.post("/exit/update", isLoggedIn, async (req, res, next) => {
  const { password } = req.body;

  const findQ = `
  SELECT  id,
          password
    FROM  users
   WHERE  id = ${req.user.id}
  `;

  const updateQ = `
  UPDATE  users
     SET  isExit = TRUE,
          exitedAt = NOW()
   WHERE  id = ${req.user.id}
  `;

  req.logout();

  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });

  try {
    const find = await models.sequelize.query(findQ);

    const result = await bcrypt.compare(password, find[0][0].password);

    if (!result) {
      return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(400).send("탈퇴할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 헤더 정보 가져오기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 김동현
 * DEV DATE : 2023/06/15
 */
router.post("/admin/main", async (req, res, next) => {
  const acceptQuery = `
  SELECT  COUNT(id)    AS cnt
    FROM  acceptRecords
   WHERE  DATE_FORMAT(createdAt, "%Y-%m-%d") = DATE_FORMAT(NOW(), "%Y-%m-%d")
  `;

  const userQuery = `
  SELECT  COUNT(id)   AS cnt
    FROM  users
   WHERE  DATE_FORMAT(createdAt, "%Y-%m-%d") = DATE_FORMAT(NOW(), "%Y-%m-%d")
     AND  isExit = 0
`;

  const productQuery = `
  SELECT  COUNT(id)    AS cnt
    FROM  product
   WHERE  isDelete = 0
  `;

  const boughtQuery = `
  SELECT  COUNT(id)   AS cnt
    FROM  boughtHistory
   WHERE  DATE_FORMAT(createdAt, "%Y-%m-%d") = DATE_FORMAT(NOW(), "%Y-%m-%d")
  `;

  try {
    const acceptData = await models.sequelize.query(acceptQuery);
    const userData = await models.sequelize.query(userQuery);
    const productData = await models.sequelize.query(productQuery);
    const boughtData = await models.sequelize.query(boughtQuery);

    return res.status(200).json({
      acceptData: acceptData[0][0],
      userData: userData[0][0],
      productData: productData[0][0],
      boughtData: boughtData[0][0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 알림톡 전송
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 김동현
 * DEV DATE : 2023/07/15
 */

router.post("/send/message", async (req, res, next) => {
  const { mobile } = req.body;

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

    const UUID = generateUUID();

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
        content: `인증번호는 ${UUID} 입니다.`,
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

    return res.status(200).json({ code: UUID });
  } catch (e) {
    console.error(e);
    return res.status(400).send("인증번호를 전송 할 수 없습니다.");
  }
});

module.exports = router;
