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
  ProductWrapper,
  RsWrapper,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
  CommonButton,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Select } from "antd";
import styled from "styled-components";

const CateBtn = styled(Wrapper)`
  padding: 0 14px;
  width: auto;
  height: 30px;
  border-radius: 30px;
  font-size: 16px;
  border: ${(props) =>
    props.isActive ? `1px solid ${Theme.black_C}` : `none`};
  color: ${(props) => (props.isActive ? Theme.black_C : Theme.grey2_C)};
  margin: 0 6px 5px;

  &:hover {
    cursor: pointer;
    color: ${Theme.grey_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  const bannerData = [
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod2.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod3.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod4.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
  ];

  return (
    <>
      <Head>
        <title>MoreRich | PRODUCT</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`40px 0 30px`}>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg`}
                width={`14px`}
                margin={`0 14px 0 0`}
              />
              <Text
                isHover
                fontSize={width < 800 ? `16px` : `28px`}
                fontWeight={`600`}
              >
                PRODUCT
              </Text>
            </Wrapper>
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
              <Image
                alt="thumbnail"
                margin={`0 0 20px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
              />
              <Image
                alt="thumbnail"
                margin={`0 0 20px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
              />
            </Wrapper>
            <Wrapper
              width={width < 1100 ? (width < 800 ? `100%` : `70%`) : `50%`}
              position={`sticky`}
              top={`120px`}
              right={`0`}
              padding={width < 800 ? `30px 0 0` : `0 0 0 40px`}
              al={`flex-start`}
            >
              <Text fontSize={width < 800 ? `16px` : `20px`} fontWeight={`600`}>
                CASESTUDY
              </Text>
              <Text
                fontSize={width < 800 ? `18px` : `24px`}
                margin={`12px 0 19px`}
              >
                [CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG
              </Text>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`4px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 36px`}
              >
                <Wrapper width={`auto`} dr={`row`}>
                  <Text
                    color={Theme.grey_C}
                    className="line"
                    margin={`0 12px 0 0`}
                    fontSize={width < 800 ? `14px` : `20px`}
                  >
                    2,100,000원
                  </Text>
                  <Text
                    fontSize={width < 800 ? `16px` : `28px`}
                    fontWeight={`bold`}
                  >
                    1,100,000원
                  </Text>
                </Wrapper>
                <Image
                  alt="heart icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                  width={`28px`}
                />
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`34px 0 16px`}>
                <Text
                  fontSize={width < 800 ? `16px` : `20px`}
                  fontWeight={`600`}
                >
                  Details
                </Text>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  fontSize={width < 800 ? `14px` : `16px`}
                  color={Theme.grey_C}
                >
                  <Text td={`underline`} isHover margin={`0 24px 0 0`}>
                    배송 /교환·환불 정보
                  </Text>
                  <Text td={`underline`} isHover>
                    상품 정보 고시
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                borderBottom={`4px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 36px`}
                al={`flex-start`}
              >
                <Text fontSize={width < 800 ? `14px` : `18px`}>
                  - Product 상세 내용
                </Text>
              </Wrapper>
              <CustomSelect
                width={`100%`}
                height={`55px`}
                margin={`34px 0`}
                sBorder={`1px solid ${Theme.black_C}`}
              >
                <Select placeholder="옵션을 선택해주세요.">
                  <Select.Option>옵션</Select.Option>
                  <Select.Option>옵션</Select.Option>
                </Select>
              </CustomSelect>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text fontSize={width < 800 ? `14px` : `20px`}>Total</Text>
                <Text
                  fontSize={width < 800 ? `16px` : `28px`}
                  fontWeight={`bold`}
                >
                  1,100,000원
                </Text>
              </Wrapper>
              <CommonButton
                width={`100%`}
                height={`60px`}
                margin={`34px 0 10px`}
                fontSize={width < 800 ? `14px` : `20px`}
                fontWeight={`600`}
              >
                바로구매
              </CommonButton>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`32%`}
                  height={`60px`}
                  fontSize={width < 800 ? `14px` : `20px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                >
                  장바구니
                </CommonButton>
                <CommonButton
                  width={`32%`}
                  height={`60px`}
                  fontSize={width < 800 ? `14px` : `20px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                >
                  1:1 채팅
                </CommonButton>
                <CommonButton
                  width={`32%`}
                  height={`60px`}
                  fontSize={width < 800 ? `14px` : `20px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                >
                  카카오톡 상담
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

export default Index;
