import React, { useCallback, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
  CommonButton,
  TextInput,
  SpanText,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { Checkbox, Modal, Radio } from "antd";

const Index = () => {
  ////// GLOBAL STATE //////
  const [cModal, setCModal] = useState(false);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const cModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);
  ////// HANDLER //////
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
                />
                <Text margin={`0 0 8px`}>연락처</Text>
                <TextInput
                  placeholder="'-'를 제외한 연락처"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>
                  <SpanText>*</SpanText>이메일
                </Text>
                <TextInput
                  placeholder="이메일"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                  readOnly
                />
                <Text margin={`0 0 8px`}>주소</Text>
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
                />

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
                />
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  kindOf={`white`}
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
