import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomSelect,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
  TextInput,
  SpanText,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Checkbox, Modal, Select } from "antd";
import { useState } from "react";
import { useCallback } from "react";
import Link from "next/dist/client/link";

const Exchange = () => {
  ////// GLOBAL STATE //////
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | EXCHANGE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`40px 0 80px`}>
              <Image
                alt="icon"
                src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg`}
                width={`14px`}
                margin={`0 14px 0 0`}
              />
              <Link href={`/mypage/order`}>
                <a>
                  <Text
                    isHover
                    fontSize={width < 800 ? `16px` : `28px`}
                    fontWeight={`600`}
                  >
                    MY PAGE
                  </Text>
                </a>
              </Link>
            </Wrapper>

            <Text
              isPoppins
              fontSize={width < 900 ? `30px` : `52px`}
              fontWeight={`bold`}
              margin={`0 0 60px`}
            >
              EXCHANGE
            </Text>
          </RsWrapper>
          <RsWrapper
            position={`relative`}
            dr={`row`}
            al={`flex-start`}
            padding={`0 0 100px`}
          >
            <Wrapper
              width={width < 1100 ? (width < 800 ? `100%` : `30%`) : `50%`}
            >
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                padding={`50px 0`}
              >
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 34px`}
                >
                  교환사유
                </Wrapper>
                <Wrapper dr={`row`} al={`flex-start`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    교환사유
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    al={`flex-start`}
                  >
                    <CustomSelect
                      width={`100%`}
                      height={`50px`}
                      sBorder={`1px solid ${Theme.black_C}`}
                    >
                      <Select placeholder="선택해주세요.">
                        <Select.Option></Select.Option>
                        <Select.Option></Select.Option>
                      </Select>
                    </CustomSelect>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      margin={`10px 0 12px`}
                    >
                      <TextInput width={`calc(100% - 188px)`} height={`50px`} />
                      <CommonButton height={`50px`} width={`180px`}>
                        첨부하기
                      </CommonButton>
                    </Wrapper>
                    <Text color={Theme.grey_C}>
                      - 최대 n장의 이미지를 첨부할 수 있습니다.
                    </Text>
                    <Text color={Theme.grey_C}>
                      - png, jpg 파일만 가능합니다.
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                borderBottom={`1px solid ${Theme.black_C}`}
                padding={`50px 0`}
              >
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 34px`}
                >
                  회수지 정보
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    주문자명
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    placeholder="주문자명"
                    height={`50px`}
                  />
                </Wrapper>
                <Wrapper dr={`row`} al={`flex-start`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    회수지
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    dr={`row`}
                    ju={`space-between`}
                  >
                    <TextInput width={`calc(100% - 188px)`} height={`50px`} />
                    <CommonButton height={`50px`} width={`180px`}>
                      주소검색
                    </CommonButton>
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      margin={`10px 0`}
                    />
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      placeholder="상세주소"
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`20px 0`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    연락처
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    placeholder="연락처"
                    height={`50px`}
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper
                borderBottom={`1px solid ${Theme.black_C}`}
                padding={`50px 0`}
              >
                <Wrapper dr={`row`} margin={`0 0 34px`}>
                  <Wrapper
                    width={width < 800 ? `100%` : `182px`}
                    fontSize={width < 800 ? `20px` : `26px`}
                    fontWeight={`600`}
                    al={`flex-start`}
                  >
                    배송지정보
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    al={`flex-start`}
                  >
                    <Checkbox>회수지 정보와 동일</Checkbox>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    주문자명
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    placeholder="주문자명"
                    height={`50px`}
                  />
                </Wrapper>
                <Wrapper dr={`row`} al={`flex-start`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    배송지
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    dr={`row`}
                    ju={`space-between`}
                  >
                    <TextInput width={`calc(100% - 188px)`} height={`50px`} />
                    <CommonButton height={`50px`} width={`180px`}>
                      주소검색
                    </CommonButton>
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      margin={`10px 0`}
                    />
                    <TextInput
                      width={`100%`}
                      height={`50px`}
                      placeholder="상세주소"
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`20px 0`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    연락처
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    placeholder="연락처"
                    height={`50px`}
                  />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    배송시 유의사항
                  </Text>
                  <CustomSelect
                    width={width < 800 ? `100%` : `calc(100% - 182px)`}
                    height={`50px`}
                    sBorder={`1px solid ${Theme.black_C}`}
                  >
                    <Select placeholder="선택해주세요.">
                      <Select.Option></Select.Option>
                      <Select.Option></Select.Option>
                    </Select>
                  </CustomSelect>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={width < 1100 ? (width < 800 ? `100%` : `70%`) : `50%`}
              padding={width < 800 ? `30px 0 0` : `0 0 0 40px`}
            >
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                padding={width < 800 ? `30px 15px` : `40px`}
                al={`flex-start`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 28px`}
                >
                  주문상품
                </Text>
                <Wrapper
                  borderTop={`1px solid ${Theme.grey3_C}`}
                  borderBottom={`1px solid ${Theme.grey3_C}`}
                  padding={`28px 0`}
                  dr={`row`}
                >
                  <Image
                    alt="thumbnail"
                    width={width < 900 ? `80px` : `112px`}
                    src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
                  />
                  <Wrapper
                    width={
                      width < 900 ? `calc(100% - 80px)` : `calc(100% - 112px)`
                    }
                    padding={`0 0 0 14px`}
                    al={`flex-start`}
                  >
                    <Text
                      fontSize={width < 900 ? `16px` : `18px`}
                      fontWeight={`600`}
                    >
                      CASESTUDY
                    </Text>
                    <Text
                      fontSize={width < 900 ? `14px` : `17px`}
                      minHeight={`45px`}
                    >
                      [CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Wrapper width={`auto`} dr={`row`}>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                          margin={`0 15px 0 0`}
                        >
                          옵션 : BLACK
                        </Text>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                        >
                          수량 : 1개
                        </Text>
                      </Wrapper>
                      <Text
                        fontSize={width < 800 ? `15px` : `18px`}
                        fontWeight={`600`}
                      >
                        1,100,000원
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                bgColor={Theme.lightGrey2_C}
                padding={width < 800 ? `30px 15px` : `40px`}
                margin={`20px 0`}
                al={`flex-start`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 28px`}
                >
                  교환 배송비
                  <SpanText
                    fontSize={`14px`}
                    fontWeight={`500`}
                    color={Theme.red_C}
                    margin={`0 0 0 14px`}
                  >
                    교환·환불의 경우 배송비 입금 확인 후 진행됩니다.
                  </SpanText>
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`15px`} color={Theme.grey_C}>
                    배송비 입금 은행
                  </Text>
                  <Text
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    농협 302-23132-3233 김맛동산
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`16px 0 0`}>
                  <Text fontSize={`15px`} color={Theme.grey_C}>
                    왕복 배송비
                  </Text>
                  <Text
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    7,000원
                  </Text>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  borderTop={`1px solid ${Theme.grey3_C}`}
                  margin={`28px 0 0`}
                  padding={`28px 0 0`}
                >
                  <Text fontSize={`15px`}>최종결제금액</Text>
                  <Text
                    fontSize={width < 800 ? `20px` : `28px`}
                    fontWeight={`bold`}
                  >
                    1,103,500원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                padding={width < 800 ? `30px 15px` : `40px`}
                al={`flex-start`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 28px`}
                >
                  약관동의
                </Text>
                <Checkbox checked>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`auto`}
                    color={Theme.darkGrey_C}
                  >
                    <Text isHover td={`underline`}>
                      이용약관
                    </Text>
                    <Text margin={`0 3px`}>및</Text>
                    <Text isHover td={`underline`}>
                      개인정보 처리방침
                    </Text>
                    <Text>을 확인하였으며 결제에 동의합니다.</Text>
                  </Wrapper>
                </Checkbox>
                <CommonButton
                  width={`100%`}
                  height={`60px`}
                  fontSize={width < 800 ? `16px` : `20px`}
                  fontWeight={`600`}
                  margin={`28px 0 0`}
                >
                  바로구매
                </CommonButton>
              </Wrapper>
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

export default Exchange;
