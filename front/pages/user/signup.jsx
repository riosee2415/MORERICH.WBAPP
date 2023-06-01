import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Input, Button, Form, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
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

const SignUp = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////\

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | SIGNUP</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`180px 0`}>
          <RsWrapper>
            <Wrapper width={`356px`}>
              <Text
                isPoppins
                fontSize={`46px`}
                fontWeight={`bold`}
                margin={`0 0 35px`}
              >
                Join
              </Text>
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *아이디
              </Wrapper>
              <TextInput
                placeholder="ExampleID"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *비밀번호
              </Wrapper>
              <TextInput
                placeholder="비밀번호"
                width={`356px`}
                height={`50px`}
                margin={`0 0 8px`}
              />
              <TextInput
                placeholder="비밀번호 재확인"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *성함
              </Wrapper>
              <TextInput
                placeholder="성함"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                연락처
              </Wrapper>
              <TextInput
                placeholder="(선택사항)'-'를 제외한 연락처"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *이메일
              </Wrapper>
              <TextInput
                placeholder="추후 아이디/비번을 찾기 위한 이메일"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                주소
              </Wrapper>
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                ju={`space-between`}
                margin={`0 0 8px`}
              >
                <TextInput
                  placeholder="(선택사항)"
                  width={`228px`}
                  height={`50px`}
                />
                <CommonButton
                  width={`calc(100% - 228px - 8px)`}
                  height={`50px`}
                  fontSize={`16px`}
                >
                  주소검색
                </CommonButton>
              </Wrapper>
              <TextInput
                placeholder="주소"
                width={`356px`}
                height={`50px`}
                margin={`0 0 8px`}
              />
              <TextInput
                placeholder="상세주소"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
              />
              <Wrapper
                al={`flex-start`}
                padding={`16px`}
                bgColor={Theme.lightGrey2_C}
                margin={`0 0 8px`}
              >
                <Checkbox>개인정보 처리방침에 동의합니다.</Checkbox>
              </Wrapper>
              <CommonButton
                width={`356px`}
                height={`50px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                회원가입
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

export default SignUp;
