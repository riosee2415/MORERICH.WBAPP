import React, { useCallback, useState } from "react";
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

const Index = () => {
  ////// GLOBAL STATE //////
  const { boughtDetail } = useSelector((state) => state.mypage);

  console.log(boughtDetail);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
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

              {boughtDetail &&
                boughtDetail.connectArray.map((item) => {
                  return (
                    <Wrapper
                      borderTop={`1px solid ${Theme.black_C}`}
                      key={item.id}
                    >
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`16px`}
                        padding={`0 14px`}
                      >
                        <Text margin={`0 16px 0 0`}>{item.viewCreatedAt}</Text>
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
                          width={width < 900 ? `100%` : `58%`}
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
                            {width < 900 && (
                              <>
                                <Text>{item.viewCalcPrice}</Text>
                                <Wrapper dr={`row`} margin={`5px 0`}>
                                  <Text
                                    fontWeight={`600`}
                                    margin={`0 10px 0 0`}
                                  >
                                    배송완료
                                  </Text>
                                  <Text color={Theme.grey_C}>롯데택배 </Text>
                                  <Text color={Theme.grey_C}>
                                    12365454654548
                                  </Text>
                                </Wrapper>
                                <Wrapper dr={`row`}>
                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                  >
                                    교환 요청
                                  </CommonButton>
                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                    margin={`0 4px`}
                                  >
                                    환불 요청
                                  </CommonButton>
                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                  >
                                    1:1 채팅
                                  </CommonButton>
                                </Wrapper>
                              </>
                            )}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                          fontSize={`18px`}
                          fontWeight={`600`}
                        >
                          {item.viewCalcPrice}
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                        >
                          <Text
                            fontSize={`18px`}
                            fontWeight={`600`}
                            margin={`0 0 14px`}
                          >
                            배송완료
                          </Text>
                          <Text color={Theme.grey_C}>롯데택배 </Text>
                          <Text color={Theme.grey_C}>12365454654548</Text>
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                        >
                          <CommonButton
                            width={`78px`}
                            height={`30px`}
                            kindOf={`grey3`}
                            padding={`0`}
                          >
                            교환 요청
                          </CommonButton>
                          <CommonButton
                            width={`78px`}
                            height={`30px`}
                            kindOf={`grey3`}
                            padding={`0`}
                            margin={`6px 0`}
                          >
                            환불 요청
                          </CommonButton>
                          <CommonButton
                            width={`78px`}
                            height={`30px`}
                            kindOf={`grey3`}
                            padding={`0`}
                          >
                            1:1 채팅
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  );
                })}

              <Wrapper
                al={`flex-start`}
                margin={`80px 0 24px`}
                fontSize={`26px`}
                fontWeight={`bold`}
              >
                배송지 정보
              </Wrapper>
              <Wrapper
                borderTop={`1px solid ${Theme.black_C}`}
                padding={`35px 0 0`}
                dr={`row`}
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
                    김아무개
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
                    010-0000-0000
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
                    <Text>주소가 들어올 곳입니다.</Text>
                    <Text>상세주소</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper width={width < 900 ? `100%` : `50%`} dr={`row`}>
                  <Text color={Theme.grey_C} width={`30%`}>
                    배송시 유의사항
                  </Text>
                  <Text width={`70%`} fontSize={`16px`}>
                    배송전 연락부탁드립니다.
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`80px 0 24px`}
                fontSize={`26px`}
                fontWeight={`bold`}
              >
                무통장입금 정보
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
                    입금은행
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    국민은행 19649078709307
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    입금금액
                  </Text>
                  <Text
                    width={width < 900 ? `70%` : `85%`}
                    fontSize={`16px`}
                    color={Theme.red_C}
                  >
                    000,000원
                  </Text>
                </Wrapper>

                <Wrapper dr={`row`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    입금기한
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    5/31
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`80px 0 24px`}
                fontSize={`26px`}
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
                    000,000원
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    배송비
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    0,000원
                  </Text>
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`}>
                  <Text
                    color={Theme.grey_C}
                    width={width < 900 ? `30%` : `15%`}
                  >
                    상품수량
                  </Text>
                  <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                    00개
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
                    000,000원
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
