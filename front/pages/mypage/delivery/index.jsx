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
        <title>MoreRich | 배송지관리</title>
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
            >
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={width < 800 ? `0 0 15px` : `0 0 26px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `34px`}
                  fontWeight={`600`}
                >
                  배송지관리
                </Text>
                <Wrapper width={`auto`} dr={`row`}>
                  <CommonButton
                    width={`100px`}
                    height={`32px`}
                    padding={`0`}
                    kindOf={`white`}
                    margin={`0 6px 0 0`}
                  >
                    삭제하기
                  </CommonButton>
                  <CommonButton
                    width={`100px`}
                    height={`32px`}
                    padding={`0`}
                    onClick={cModalToggle}
                  >
                    추가하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                dr={`row`}
                fontSize={`16px`}
                height={`50px`}
                borderBottom={`1px solid ${Theme.grey3_C}`}
              >
                <Wrapper width={`5%`}>
                  <Checkbox />
                </Wrapper>
                <Wrapper width={`15%`}>명칭</Wrapper>
                <Wrapper width={`20%`}>성명/연락처</Wrapper>
                <Wrapper width={`45%`}>주소</Wrapper>
                <Wrapper width={`15%`}>기본주소로 설정</Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                padding={`20px 0`}
                borderBottom={`1px solid ${Theme.grey3_C}`}
              >
                <Wrapper width={`5%`}>
                  <Checkbox />
                </Wrapper>
                <Wrapper fontSize={`16px`} width={`15%`} fontWeight={`600`}>
                  판암동마루
                </Wrapper>
                <Wrapper width={`20%`} color={Theme.darkGrey_C}>
                  <Text>박마루</Text>
                  <Text>010-0000-0000</Text>
                </Wrapper>
                <Wrapper
                  width={`45%`}
                  al={`flex-start`}
                  color={Theme.darkGrey_C}
                >
                  <Text>대전광역시 동구 뭐시깽이 OO로00-00 0000아파트</Text>
                  <Text>000동 0000호</Text>
                </Wrapper>
                <Wrapper width={`15%`}>
                  <Radio />
                </Wrapper>
              </Wrapper>
              <CustomPage margin={`60px 0 0`} />
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={cModalToggle} visible={cModal} footer={null}>
            <Wrapper padding={width < 800 ? `30px 0` : `50px`}>
              <Text fontSize={`28px`} fontWeight={`600`} margin={`0 0 30px`}>
                배송지 추가
              </Text>
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 8px`}>명칭</Text>
                <TextInput
                  placeholder="명칭"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>성명</Text>
                <TextInput
                  placeholder="성명"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>연락처</Text>
                <TextInput
                  placeholder="'-'를 제외한 연락처"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
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
                    주문취소
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
                  margin={`0 0 25px`}
                />

                <Checkbox>기본주소로 설정</Checkbox>
              </Wrapper>

              <CommonButton
                width={`100%`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`15px 0 0`}
              >
                추가하기
              </CommonButton>
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
