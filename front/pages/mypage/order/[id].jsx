import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BOUGHT_DETAIL_REQUEST } from "../../../reducers/mypage";
import { numberWithCommas } from "../../../components/commonUtils";
import { message } from "antd";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { boughtDetail } = useSelector((state) => state.mypage);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);

      return message.error("로그인이 필요한 서비스입니다.");
    }
  }, [me]);
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | Mypage</title>
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
                fontSize={width < 800 ? `20px` : `34px`}
                fontWeight={`600`}
                al={`flex-start`}
                margin={width < 800 ? `0 0 15px` : `0 0 26px`}
              >
                구매내역상세
              </Wrapper>

              <Wrapper borderTop={`1px solid ${Theme.black_C}`}>
                {boughtDetail &&
                  boughtDetail.connectArray.map((item) => {
                    return (
                      <Wrapper key={item.id}>
                        <Wrapper
                          height={`50px`}
                          borderBottom={`1px solid ${Theme.grey3_C}`}
                          dr={`row`}
                          ju={`flex-start`}
                          fontSize={`16px`}
                          padding={`0 14px`}
                        >
                          <Text margin={`0 16px 0 0`}>
                            {boughtDetail.viewCreatedAt}
                          </Text>
                          <Text color={Theme.grey_C}>
                            {item.sortCreatedAt}
                            {item.id}
                          </Text>
                        </Wrapper>
                        <Wrapper
                          borderBottom={`1px solid ${Theme.black_C}`}
                          dr={`row`}
                        >
                          <Wrapper
                            width={width < 900 ? `100%` : `85%`}
                            dr={`row`}
                            padding={`23px 14px`}
                          >
                            <Image
                              alt="thumbnail"
                              width={width < 900 ? `80px` : `112px`}
                              height={width < 900 ? `80px` : `112px`}
                              src={item.thumbnail}
                            />
                            <Wrapper
                              width={
                                width < 900
                                  ? `calc(100% - 80px)`
                                  : `calc(100% - 112px)`
                              }
                              padding={`0 0 0 14px`}
                              al={`flex-start`}
                            >
                              <Text
                                fontSize={width < 900 ? `16px` : `18px`}
                                fontWeight={`600`}
                              >
                                {item.productName}
                              </Text>

                              <Wrapper width={`auto`} dr={`row`}>
                                <Text
                                  fontSize={width < 900 ? `14px` : `15px`}
                                  color={Theme.grey_C}
                                  margin={`0 15px 0 0`}
                                >
                                  옵션 : {item.optionValue}
                                </Text>
                                <Text
                                  fontSize={width < 900 ? `14px` : `15px`}
                                  color={Theme.grey_C}
                                >
                                  수량 : {item.qun}개
                                </Text>
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            width={`15%`}
                            display={width < 900 ? `none` : `flex`}
                            fontSize={`18px`}
                            fontWeight={`600`}
                          >
                            {item.viewCalcPrice}
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    );
                  })}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`80px 0 24px`}
                fontSize={width < 900 ? `20px` : `26px`}
                fontWeight={`bold`}
              >
                배송지 정보
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                padding={`35px 0 0`}
                dr={`row`}
                ju={`flex-start`}
              >
                <Wrapper
                  width={width < 900 ? `100%` : `50%`}
                  dr={`row`}
                  margin={`0 0 20px`}
                >
                  <Text color={Theme.grey_C} width={`30%`}>
                    주문자명
                  </Text>
                  <Text width={`70%`} fontSize={`16px`}>
                    {boughtDetail && boughtDetail.username}
                  </Text>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `50%`}
                  dr={`row`}
                  margin={`0 0 20px`}
                >
                  <Text color={Theme.grey_C} width={`30%`}>
                    연락처
                  </Text>
                  <Text width={`70%`} fontSize={`16px`}>
                    {boughtDetail && boughtDetail.mobile}
                  </Text>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `50%`}
                  dr={`row`}
                  al={`flex-start`}
                >
                  <Text color={Theme.grey_C} width={`30%`}>
                    배송지
                  </Text>
                  <Wrapper fontSize={`16px`} width={`70%`} al={`flex-start`}>
                    <Text>
                      ({boughtDetail && boughtDetail.post})
                      {boughtDetail && boughtDetail.adrs}
                    </Text>
                    <Text>{boughtDetail && boughtDetail.dadrs}</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              {boughtDetail && boughtDetail.reason && (
                <>
                  <Wrapper
                    al={`flex-start`}
                    margin={`80px 0 24px`}
                    fontSize={width < 900 ? `20px` : `26px`}
                    fontWeight={`bold`}
                  >
                    취소/환불 신청 내역
                  </Wrapper>
                  <Wrapper
                    borderTop={`1px solid ${Theme.black_C}`}
                    padding={`35px 0 0`}
                    dr={`row`}
                  >
                    <Wrapper dr={`row`} margin={`0 0 20px`}>
                      <Text
                        color={Theme.grey_C}
                        width={width < 900 ? `30%` : `15%`}
                      >
                        취소/환불 사유
                      </Text>
                      <Text
                        width={width < 900 ? `70%` : `85%`}
                        fontSize={`16px`}
                        color={Theme.red_C}
                      >
                        {boughtDetail && boughtDetail.reason}
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} margin={`0 0 20px`}>
                      <Text
                        color={Theme.grey_C}
                        width={width < 900 ? `30%` : `15%`}
                      >
                        계좌주명
                      </Text>
                      <Text
                        width={width < 900 ? `70%` : `85%`}
                        fontSize={`16px`}
                      >
                        {boughtDetail && boughtDetail.returnAccountName}
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} margin={`0 0 20px`}>
                      <Text
                        color={Theme.grey_C}
                        width={width < 900 ? `30%` : `15%`}
                      >
                        은행/계좌번호
                      </Text>
                      <Text
                        width={width < 900 ? `70%` : `85%`}
                        fontSize={`16px`}
                      >
                        {boughtDetail && boughtDetail.returnBankName} /&nbsp;
                        {boughtDetail && boughtDetail.returnAccountNum}
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </>
              )}

              <Wrapper
                al={`flex-start`}
                margin={`80px 0 24px`}
                fontSize={width < 900 ? `20px` : `26px`}
                fontWeight={`bold`}
              >
                결제금액 정보
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                padding={`35px 0 0`}
                dr={`row`}
              >
                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    상품금액
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    {boughtDetail &&
                      numberWithCommas(
                        boughtDetail.connectArray.reduce((sum, currValue) => {
                          let a = parseInt(sum + currValue.price);

                          return a;
                        }, 0)
                      )}
                    원
                  </Text>
                </Wrapper>
                {/* <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    배송비
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    2,500원
                  </Text>
                </Wrapper> */}

                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    상품수량
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    {boughtDetail && boughtDetail.connectArray.length}개
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text width={width < 900 ? `30%` : `15%`}>최종결제금액</Text>
                  <Text
                    width={width < 900 ? `70%` : `85%`}
                    fontSize={`20px`}
                    fontWeight={`bold`}
                    color={Theme.red_C}
                  >
                    {boughtDetail &&
                      numberWithCommas(
                        boughtDetail.connectArray.reduce((sum, currValue) => {
                          let a = parseInt(sum + currValue.price);

                          return a;
                        }, 0)
                      )}
                    원
                  </Text>
                </Wrapper>
              </Wrapper>

              <Link href={`/mypage/order`}>
                <a>
                  <CommonButton
                    margin={`60px 0 0`}
                    width={`260px`}
                    height={`60px`}
                    fontSize={width < 900 ? `16px` : `20px`}
                    fontWeight={`600`}
                  >
                    목록
                  </CommonButton>
                </a>
              </Link>
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

    context.store.dispatch({
      type: BOUGHT_DETAIL_REQUEST,
      data: {
        id: context.query.id,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
