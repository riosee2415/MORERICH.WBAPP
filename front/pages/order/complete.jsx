import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";

const Complete = () => {
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
        <title>MoreRich | ORDER</title>
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
              Thank you
            </Text>
            <Wrapper
              borderTop={`1px solid ${Theme.black_C}`}
              height={`50px`}
              borderBottom={`1px solid ${Theme.grey3_C}`}
              dr={`row`}
              ju={`flex-start`}
              fontSize={`16px`}
              padding={`0 14px`}
            >
              <Text margin={`0 16px 0 0`}>2023-05-23</Text>
              <Text color={Theme.grey_C}>ORDER230137192783</Text>
            </Wrapper>
            <Wrapper borderBottom={`1px solid ${Theme.black_C}`} dr={`row`}>
              <Wrapper
                width={width < 900 ? `100%` : `80%`}
                dr={`row`}
                padding={`23px 14px`}
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
                  {width < 900 && (
                    <>
                      <Text>1,100,000원</Text>
                      <Text>입금 대기중</Text>
                    </>
                  )}
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={`10%`}
                display={width < 900 ? `none` : `flex`}
                fontSize={`18px`}
                fontWeight={`600`}
              >
                1,100,000원
              </Wrapper>
              <Wrapper
                width={`10%`}
                display={width < 900 ? `none` : `flex`}
                fontSize={`18px`}
                fontWeight={`600`}
              >
                입금 대기중
              </Wrapper>
            </Wrapper>
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
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
                  입금은행
                </Text>
                <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                  국민은행 19649078709307
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 20px`}>
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
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
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
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
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
                  상품금액
                </Text>
                <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                  000,000원
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 20px`}>
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
                  배송비
                </Text>
                <Text width={width < 900 ? `70%` : `85%`} fontSize={`16px`}>
                  0,000원
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`}>
                <Text color={Theme.grey_C} width={width < 900 ? `30%` : `15%`}>
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

            <CommonButton
              margin={`60px 0 120px`}
              width={`260px`}
              height={`60px`}
              fontSize={width < 900 ? `16px` : `20px`}
              fontWeight={`600`}
            >
              메인으로
            </CommonButton>
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

export default Complete;
