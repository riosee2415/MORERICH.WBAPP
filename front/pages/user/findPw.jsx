import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECK_SECRET_REQUEST,
  USER_FIND_PW_REQUEST,
  USER_MODIFY_UPDATE_REQUEST,
} from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";

const FindPw = () => {
  ////// GLOBAL STATE //////
  const {
    //
    st_userFindPwDone,
    st_userFindPwError,
    //
    st_checkSecretDone,
    st_checkSecretError,
    //
    st_userModifyUpdateDone,
    st_userModifyUpdateError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  // CRUEET
  const [currentTab, setCurrentTab] = useState(0); // 0:이메일,성함 / 1:아이디결과

  // INPUT
  const idInput = useInput(``);
  const emailInput = useInput(``);
  const secretInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);

  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_userModifyUpdateDone) {
      router.push(`/user/login`);
      return message.success("비밀번호가 업데이트 됐습니다.");
    }

    if (st_userModifyUpdateError) {
      return message.error(st_userModifyUpdateError);
    }
  }, [st_userModifyUpdateDone, st_userModifyUpdateError]);

  useEffect(() => {
    if (st_checkSecretDone) {
      setCurrentTab(2);
      return message.success("인증번호가 인증이 완료되었습니다.");
    }

    if (st_checkSecretError) {
      return message.error(st_checkSecretError);
    }
  }, [st_checkSecretDone, st_checkSecretError]);

  useEffect(() => {
    if (st_userFindPwDone) {
      setCurrentTab(1);

      return message.success("해당 이메일로 인증번호가 전송되었습니다.");
    }

    if (st_userFindPwError) {
      return message.error(st_userFindPwError);
    }
  }, [st_userFindPwDone, st_userFindPwError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const modifyHandler = useCallback(() => {
    if (currentTab === 0) {
      //   인증번호 전송
      if (!emailInput.value) {
        return message.error("이메일을 입력해주세요.");
      }

      if (!idInput.value) {
        return message.error("아이디를 입력해주세요.");
      }

      dispatch({
        type: USER_FIND_PW_REQUEST,
        data: {
          email: emailInput.value,
          userId: idInput.value,
        },
      });
    }

    if (currentTab === 1) {
      if (!secretInput.value) {
        return message.error("인증번호를 입력해주세요.");
      }
      dispatch({
        type: CHECK_SECRET_REQUEST,
        data: {
          secret: secretInput.value,
        },
      });
    }

    if (currentTab === 2) {
      if (!pwInput.value) {
        return message.error("비밀번호를 입력해주세요.");
      }

      if (!pwCheckInput.value) {
        return message.error("비밀번호 재확인을 입력해주세요.");
      }

      if (pwInput.value !== pwCheckInput.value) {
        return message.error("비밀번호가 일치하지 않습니다.");
      }

      dispatch({
        type: USER_MODIFY_UPDATE_REQUEST,
        data: {
          userId: idInput.value,
          password: pwInput.value,
        },
      });
    }
  }, [emailInput, idInput, currentTab, secretInput, pwInput, pwCheckInput]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | FINDPW</title>
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
                FIND PW
              </Text>
              {currentTab === 0 && (
                <>
                  <TextInput
                    placeholder="아이디"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 8px`}
                    {...idInput}
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
                    placeholder="인증번호"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 11px`}
                    {...secretInput}
                  />
                </>
              )}
              {currentTab === 2 && (
                <>
                  <TextInput
                    placeholder="비밀번호"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 8px`}
                    {...pwInput}
                    type="password"
                  />
                  <TextInput
                    placeholder="비밀번호 재설정"
                    width={`356px`}
                    height={`50px`}
                    margin={`0 0 11px`}
                    {...pwCheckInput}
                    type="password"
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
                  onClick={() => router.push(`/user/findid`)}
                >
                  ID찾기
                </Text>
              </Wrapper>
              <CommonButton
                width={`356px`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`0 0 8px`}
                onClick={modifyHandler}
              >
                {currentTab === 1
                  ? currentTab === 0
                    ? "PW 찾기"
                    : "인증번호"
                  : "비밀번호 재설정"}
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

export default FindPw;
