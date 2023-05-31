import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CustomSelect,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
  TextInput,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { Checkbox, Modal, Select } from "antd";
import Link from "next/dist/client/link";

const Cancel = () => {
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
        <title>MoreRich | ORDER CANCEL</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`40px 0 80px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg`}
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
              ORDER CANCEL
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
                borderBottom={`1px solid ${Theme.black_C}`}
                padding={`50px 0`}
              >
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 800 ? `20px` : `26px`}
                  fontWeight={`600`}
                  margin={`0 0 34px`}
                >
                  취소 사유
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text
                    width={width < 800 ? `100%` : `182px`}
                    lineHeight={`50px`}
                  >
                    교환사유
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
              <Wrapper
                al={`flex-start`}
                fontSize={width < 800 ? `20px` : `26px`}
                fontWeight={`600`}
                margin={`50px 0 34px`}
              >
                환불 계좌 정보
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`}>
                <Text
                  width={width < 800 ? `100%` : `182px`}
                  lineHeight={`50px`}
                >
                  계좌주명
                </Text>
                <TextInput
                  width={width < 800 ? `100%` : `calc(100% - 182px)`}
                  placeholder="계좌주명"
                  height={`50px`}
                />
              </Wrapper>
              <Wrapper dr={`row`} al={`flex-start`}>
                <Text
                  width={width < 800 ? `100%` : `182px`}
                  lineHeight={`50px`}
                >
                  은행명
                </Text>
                <Wrapper
                  width={width < 800 ? `100%` : `calc(100% - 182px)`}
                  dr={`row`}
                  ju={`space-between`}
                >
                  <CustomSelect
                    width={`100%`}
                    height={`50px`}
                    sBorder={`1px solid ${Theme.black_C}`}
                  >
                    <Select placeholder="은행명을 선택해주세요.">
                      <Select.Option></Select.Option>
                      <Select.Option></Select.Option>
                    </Select>
                  </CustomSelect>
                  <TextInput
                    margin={`10px 0 0`}
                    width={`100%`}
                    height={`50px`}
                    placeholder="'-'없이 숫자만 입력해주세요."
                  />
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
                  결제금액
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`15px`} color={Theme.grey_C}>
                    상품 금액
                  </Text>
                  <Text
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    1,100,000원
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`16px 0`}>
                  <Text fontSize={`15px`} color={Theme.grey_C}>
                    상품 수량
                  </Text>
                  <Text
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    1개
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text fontSize={`15px`} color={Theme.grey_C}>
                    배송비
                  </Text>
                  <Text
                    fontSize={width < 800 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    3,500원
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
                <CommonButton
                  width={`100%`}
                  height={`60px`}
                  fontSize={width < 800 ? `16px` : `20px`}
                  fontWeight={`600`}
                  margin={`28px 0 0`}
                >
                  취소요청하기
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

export default Cancel;
