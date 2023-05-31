import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Checkbox, Select } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Index = () => {
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
        <title>MoreRich | CART</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Text
              isPoppins
              fontSize={width < 900 ? `30px` : `52px`}
              fontWeight={`bold`}
              margin={`60px 0`}
            >
              CART
            </Text>
            <Wrapper al={`flex-start`}>
              <CommonButton width={`100px`} height={`32px`} kindOf={`white`}>
                삭제하기
              </CommonButton>
            </Wrapper>
            <Wrapper
              dr={`row`}
              borderTop={`1px solid ${Theme.black_C}`}
              borderBottom={`1px solid ${Theme.grey3_C}`}
              margin={`16px 0 0`}
              height={`50px`}
              fontSize={`16px`}
            >
              <Wrapper width={width < 900 ? `10%` : `5%`}>
                <Checkbox />
              </Wrapper>
              <Wrapper width={width < 900 ? `90%` : `53%`}>상품</Wrapper>
              <Wrapper width={`14%`} display={width < 900 ? `none` : `flex`}>
                수량
              </Wrapper>
              <Wrapper width={`14%`} display={width < 900 ? `none` : `flex`}>
                가격
              </Wrapper>
              <Wrapper width={`14%`} display={width < 900 ? `none` : `flex`}>
                배송비
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.black_C}`}
              fontSize={`16px`}
              padding={`22px 0`}
            >
              <Wrapper width={width < 900 ? `10%` : `5%`}>
                <Checkbox />
              </Wrapper>
              <Wrapper width={width < 900 ? `90%` : `53%`} dr={`row`}>
                <Image
                  alt="thumbnail"
                  width={width < 900 ? `80px` : `112px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
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
                  <Text
                    fontSize={width < 900 ? `14px` : `15px`}
                    color={Theme.grey_C}
                  >
                    옵션 : BLACK
                  </Text>
                  {width < 900 && (
                    <>
                      <Wrapper
                        margin={`5px 0`}
                        width={`auto`}
                        dr={`row`}
                        border={`1px solid ${Theme.grey3_C}`}
                        bgColor={Theme.white_C}
                        color={Theme.grey_C}
                      >
                        <Wrapper
                          width={`30px`}
                          cursor={`pointer`}
                          height={`30px`}
                          fontSize={`12px`}
                        >
                          <MinusOutlined />
                        </Wrapper>
                        <Wrapper
                          width={`50px`}
                          height={`30px`}
                          fontWeight={`600`}
                          borderLeft={`1px solid ${Theme.grey3_C}`}
                          borderRight={`1px solid ${Theme.grey3_C}`}
                        >
                          1
                        </Wrapper>
                        <Wrapper
                          width={`30px`}
                          cursor={`pointer`}
                          height={`30px`}
                          fontSize={`12px`}
                        >
                          <PlusOutlined />
                        </Wrapper>
                      </Wrapper>
                      <Text>1,100,000원</Text>
                    </>
                  )}
                </Wrapper>
              </Wrapper>
              <Wrapper width={`14%`} display={width < 900 ? `none` : `flex`}>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  border={`1px solid ${Theme.grey3_C}`}
                  bgColor={Theme.white_C}
                  color={Theme.grey_C}
                >
                  <Wrapper
                    width={`30px`}
                    cursor={`pointer`}
                    height={`30px`}
                    fontSize={`12px`}
                  >
                    <MinusOutlined />
                  </Wrapper>
                  <Wrapper
                    width={`50px`}
                    height={`30px`}
                    fontWeight={`600`}
                    borderLeft={`1px solid ${Theme.grey3_C}`}
                    borderRight={`1px solid ${Theme.grey3_C}`}
                  >
                    1
                  </Wrapper>
                  <Wrapper
                    width={`30px`}
                    cursor={`pointer`}
                    height={`30px`}
                    fontSize={`12px`}
                  >
                    <PlusOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={`14%`}
                display={width < 900 ? `none` : `flex`}
                fontSize={`18px`}
                fontWeight={`600`}
              >
                1,100,000원
              </Wrapper>
              <Wrapper
                width={`14%`}
                display={width < 900 ? `none` : `flex`}
                fontSize={`18px`}
                fontWeight={`600`}
              >
                3,500원
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              height={width < 900 ? `200px` : `155px`}
              bgColor={Theme.lightGrey2_C}
              margin={`50px 0 0`}
            >
              <Wrapper width={width < 900 ? `50%` : `calc(100% / 3)`}>
                <Text
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `15px` : `20px`}
                >
                  총 상품 금액
                </Text>
                <Text
                  fontSize={width < 900 ? `16px` : `28px`}
                  fontWeight={`600`}
                >
                  1,100,000원
                </Text>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `50%` : `calc(100% / 3)`}
                position={`relative`}
              >
                <Text
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `15px` : `20px`}
                >
                  총 배송비
                </Text>
                <Text
                  fontSize={width < 900 ? `16px` : `28px`}
                  fontWeight={`600`}
                >
                  3,500원
                </Text>
                <Wrapper
                  width={width < 900 ? `25px` : `40px`}
                  position={`absolute`}
                  left={width < 900 ? `-12px` : `-20px`}
                >
                  <Image
                    alt="plus icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/cart-page/icon_plus.png`}
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `calc(100% / 3)`}
                position={`relative`}
              >
                <Wrapper
                  width={width < 900 ? `25px` : `40px`}
                  position={`absolute`}
                  left={width < 900 ? `20px` : `-20px`}
                >
                  <Image
                    alt="equal icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/cart-page/icon_equal.png`}
                  />
                </Wrapper>
                <Text
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `15px` : `20px`}
                >
                  최종결제금액
                </Text>
                <Text
                  fontSize={width < 900 ? `16px` : `28px`}
                  fontWeight={`600`}
                >
                  1,103,000원
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} margin={`60px 0 120px`}>
              <CommonButton
                width={width < 800 ? `150px` : `260px`}
                fontSize={width < 900 ? `15px` : `20px`}
                fontWeight={`600`}
                height={`60px`}
                kindOf={`white`}
                margin={`0 5px 0 0`}
              >
                선택구매
              </CommonButton>
              <CommonButton
                width={width < 800 ? `150px` : `260px`}
                fontSize={width < 900 ? `15px` : `20px`}
                fontWeight={`600`}
                height={`60px`}
                margin={`0 0 0 5px`}
              >
                전체구매
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

export default Index;
