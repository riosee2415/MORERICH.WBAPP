import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  LOGOUT_REQUEST,
  USER_EXIT_REQUEST,
  USER_UPDATE_REQUEST,
} from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  CommonButton,
  TextInput,
  SpanText,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { message, Modal } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";

const Index = () => {
  ////// GLOBAL STATE //////
  const {
    me,
    //
    st_userExitError,
    st_userExitDone,
    //
    st_userUpdateError,
    st_userUpdateDone,
  } = useSelector((state) => state.user);
  const [cModal, setCModal] = useState(false);

  const exitPassword = useInput(``);
  const password = useInput(``);
  const mobile = useInput(me && me.mobile);
  const email = useInput(me && me.email);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);

      return message.error("로그인이 필요한 서비스입니다.");
    }
  }, [me]);

  // ********************** 회원정보 수정 후처리 *************************

  useEffect(() => {
    if (st_userUpdateError) {
      return message.error(st_userUpdateError);
    }
  }, [st_userUpdateError]);

  useEffect(() => {
    if (st_userUpdateDone) {
      password.setValue(``);

      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      return message.success("회원정보가 수정되었습니다.");
    }
  }, [st_userUpdateDone]);

  // ********************** 회원탈퇴 후처리 *************************

  useEffect(() => {
    if (st_userExitError) {
      return message.error(st_userExitError);
    }
  }, [st_userExitError]);

  useEffect(() => {
    if (st_userExitDone) {
      router.push(`/`);

      dispatch({
        type: LOGOUT_REQUEST,
      });

      return message.success("탈퇴되었습니다.");
    }
  }, [st_userExitDone]);

  ////// TOGGLE //////
  const cModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);
  ////// HANDLER //////

  // 회원정보수정
  const userModifyHandler = useCallback(() => {
    if (!mobile.value) {
      return message.error("전화번호를 입력해주세요.");
    }

    if (!email.value) {
      return message.error("이메일을 입력해주세요.");
    }

    if (!password.value || password.value.trim() === "") {
      return message.error("비밀번호를 입력해주세요.");
    }
    //
    if (email.value === me.email && mobile.value === me.mobile) {
      return message.error("변경할 정보가 없습니다.");
    }

    dispatch({
      type: USER_UPDATE_REQUEST,
      data: {
        password: password.value,
        email: email.value,
        mobile: mobile.value,
      },
    });
  }, [password.value, email.value, mobile.value]);

  // 회원탈퇴
  const exitHandler = useCallback(() => {
    if (!exitPassword.value || exitPassword.value.trim() === "") {
      return message.error("비밀번호를 입력해주세요.");
    }

    dispatch({
      type: USER_EXIT_REQUEST,
      data: {
        password: exitPassword.value,
      },
    });
  }, [exitPassword.value]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | 회원정보수정</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`80px 0`}>
          <RsWrapper al={`flex-start`}>
            <Text fontSize={`34px`} fontWeight={`600`} margin={`0 0 22px`}>
              MY PAGE
            </Text>
          </RsWrapper>
          <RsWrapper dr={`row`} position={`relative`} al={`flex-start`}>
            <MypageLeft />
            <Wrapper
              width={width < 1100 ? `100%` : `calc(100% - 266px)`}
              padding={width < 1100 ? `40px 0 0` : `0 0 0 54px`}
              al={`flex-start`}
            >
              <Wrapper
                al={`flex-start`}
                margin={width < 800 ? `0 0 15px` : `0 0 26px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `34px`}
                  fontWeight={`600`}
                >
                  회원정보수정
                </Text>
              </Wrapper>

              <Wrapper al={`flex-start`} width={width < 500 ? `100%` : `356px`}>
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>아이디
                </Text>
                <TextInput
                  placeholder="아이디"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  readOnly
                  value={me && me.userId}
                />
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>비밀번호
                </Text>
                <TextInput
                  placeholder="비밀번호"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  type={`password`}
                  {...password}
                />
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>성함
                </Text>
                <TextInput
                  placeholder="성함"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  readOnly
                  value={me && me.username}
                />
                <Text margin={`0 0 8px`}>연락처</Text>
                <TextInput
                  placeholder="'-'를 제외한 연락처"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  {...mobile}
                />
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>이메일
                </Text>
                <TextInput
                  placeholder="이메일"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  {...email}
                />
                {/* <Text margin={`0 0 8px`}>주소</Text>
                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 8px`}>
                  <TextInput
                    placeholder="'-'를 제외한 연락처"
                    width={`calc(100% - 130px)`}
                    height={`50px`}
                  />
                  <CommonButton
                    width={`120px`}
                    fontSize={`16px`}
                    fontWeight={`600`}
                    height={`50px`}
                  >
                    우편번호
                  </CommonButton>
                </Wrapper>
                <TextInput
                  placeholder="주소"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 8px`}
                />
                <TextInput
                  placeholder="상세주소"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 28px`}
                /> */}

                <Wrapper al={`flex-end`}>
                  <Text isHover color={Theme.grey_C} onClick={cModalToggle}>
                    회원탈퇴
                  </Text>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  margin={`15px 0 0`}
                  onClick={userModifyHandler}
                >
                  회원정보수정
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={cModalToggle} visible={cModal} footer={null}>
            <Wrapper padding={width < 800 ? `30px 0` : `50px`}>
              <Text fontSize={`28px`} fontWeight={`600`}>
                회원탈퇴
              </Text>
              <Text fontSize={`16px`} margin={`30px 0 0`}>
                회원탈퇴시 구매내역이 모두 소실됩니다.
              </Text>
              <Text fontSize={`16px`} margin={`0 0 30px`}>
                정말 탈퇴하시겠습니까?
              </Text>
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>비밀번호확인
                </Text>
                <TextInput
                  placeholder="비밀번호"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  type={`password`}
                  {...exitPassword}
                />
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  kindOf={`white`}
                  onClick={exitHandler}
                >
                  탈퇴하기
                </CommonButton>
                <CommonButton
                  width={`49%`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  margin={`0 0 0 4px`}
                  onClick={cModalToggle}
                >
                  취소
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
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

export default Index;
