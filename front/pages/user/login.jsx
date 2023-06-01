import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Input, Button, Form, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";
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
import Link from "next/dist/client/link";

const Login = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  // INPUT
  const idInput = useInput(``);
  const pwInput = useInput(``);

  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER ///////

  const loginHandler = useCallback(() => {
    if (!idInput.value) {
      return message.error("아이디를 입력해주세요.");
    }

    if (!pwInput.value) {
      return message.error("비밀번호를 입력해주세요.");
    }

    dispatch({
      type: LOGIN_REQUEST,
      data: {
        id: idInput.value,
        password: pwInput.value,
      },
    });
  }, [idInput, pwInput]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | LOGIN</title>
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
                Login
              </Text>
              <TextInput
                placeholder="ID"
                width={`356px`}
                height={`50px`}
                margin={`0 0 8px`}
                {...idInput}
              />
              <TextInput
                placeholder="비밀번호"
                width={`356px`}
                height={`50px`}
                margin={`0 0 11px`}
                {...pwInput}
              />
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 12px`}>
                <Link href={`/user/findid`}>
                  <a>
                    <Text color={Theme.grey_C} isHover>
                      ID찾기
                    </Text>
                  </a>
                </Link>
                <Text color={Theme.grey_C} isHover td={`underline`}>
                  PW재설정
                </Text>
              </Wrapper>
              <CommonButton
                width={`356px`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`0 0 8px`}
                onClick={loginHandler}
              >
                로그인
              </CommonButton>
              <CommonButton
                width={`356px`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`0 0 8px`}
                kindOf={`white`}
                onClick={() => router.push(`/user/signup`)}
              >
                회원가입
              </CommonButton>
              <CommonButton
                width={`356px`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                kindOf={`kakao`}
              >
                <Image
                  width={`19px`}
                  margin={`0 6px 0 0`}
                  alt="kakao"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_kakao_h.png`}
                />
                카카오로 로그인
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

export default Login;
