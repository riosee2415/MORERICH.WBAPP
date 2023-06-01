import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Input, Button, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST, USER_FIND_ID_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";

const FindId = () => {
  ////// GLOBAL STATE //////
  const {
    findId,
    //
    st_userFindIdDone,
    st_userFindIdError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  // CRUEET
  const [currentTab, setCurrentTab] = useState(0); // 0:이메일,성함 / 1:아이디결과

  // INPUT
  const nameInput = useInput(``);
  const emailInput = useInput(``);

  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_userFindIdDone) {
      setCurrentTab(1);

      return message.success("아이디를 찾았습니다.");
    }

    if (st_userFindIdError) {
      return message.error(st_userFindIdError);
    }
  }, [st_userFindIdDone, st_userFindIdError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  // 아이디 찾기
  const findIdHandler = useCallback(() => {
    if (currentTab === 1) {
      return router.push(`/user/login`);
    }

    if (!nameInput.value) {
      return message.error("이름을 입력해주세요.");
    }

    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }

    dispatch({
      type: USER_FIND_ID_REQUEST,
      data: {
        username: nameInput.value,
        email: emailInput.value,
      },
    });
  }, [nameInput, emailInput, currentTab]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | FINDID</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`180px 0`}>
          <RsWrapper>
            <Wrapper width={`356px`}>
              <Text
                isPoppins
                fontSize={`46px`}
                fontWeight={`bold`}
                margin={`0 0 36px`}
              >
                FIND ID
              </Text>
              {currentTab === 0 && (
                <>
                  <TextInput
                    placeholder="성함"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 8px`}
                    {...nameInput}
                  />
                  <TextInput
                    placeholder="이메일 주소"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 11px`}
                    {...emailInput}
                  />
                </>
              )}
              {currentTab === 1 && (
                <>
                  <TextInput
                    placeholder="성함"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 11px`}
                    readOnly
                    value={findId}
                  />
                </>
              )}
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 12px`}>
                <Text
                  color={Theme.grey_C}
                  isHover
                  onClick={() => router.push(`/user/login`)}
                >
                  로그인
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  td={`underline`}
                  onClick={() => router.push(`/user/findPw`)}
                >
                  PW재설정
                </Text>
              </Wrapper>
              <CommonButton
                width={`356px`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`0 0 8px`}
                onClick={findIdHandler}
              >
                {currentTab === 0 ? "아이디 찾기" : "로그인"}
              </CommonButton>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default FindId;
