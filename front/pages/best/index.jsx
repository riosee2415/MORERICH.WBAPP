import React, { useCallback, useEffect, useState } from "react";
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
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Empty, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT_REQUEST } from "../../reducers/store";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const { products } = useSelector((state) => state.store);

  const [orderType, setOrderType] = useState(1); // 순서

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_REQUEST,
      data: {
        orderType: orderType,
        isBest: 1,
      },
    });
  }, [orderType]);

  ////// TOGGLE //////
  ////// HANDLER //////
  // 순서
  const orderTypeHandler = useCallback(
    (data) => {
      setOrderType(data);
    },
    [orderType]
  );

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | BEST</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            height={width < 900 ? `120px` : `188px`}
          >
            <Text
              isPoppins
              fontSize={width < 900 ? `22px` : `34px`}
              fontWeight={`600`}
            >
              BEST
            </Text>
          </Wrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 20px`}>
              <Text color={Theme.grey_C}>
                {products && products.length}개의 상품이 존재합니다.
              </Text>
              <CustomSelect
                width={width < 900 ? `160px` : `225px`}
                height={`40px`}
              >
                <Select
                  placeholder="선택해주세요"
                  value={orderType}
                  onChange={orderTypeHandler}
                >
                  <Select.Option value={1}>조회순</Select.Option>
                  <Select.Option value={2}>가격낮은순</Select.Option>
                  <Select.Option value={3}>가격높은순</Select.Option>
                </Select>
              </CustomSelect>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {products && products.length === 0 ? (
                <Wrapper padding={`100px 0`}>
                  <Empty description="조회된 내역이 없습니다." />
                </Wrapper>
              ) : (
                products.map((data, idx) => {
                  return (
                    <ProductWrapper
                      key={idx}
                      onClick={() => movelinkHandler(`/product/${data.id}`)}
                    >
                      <SquareBox>
                        <Image alt="thumbnail" src={data.thumbnail} />
                      </SquareBox>

                      <Wrapper
                        padding={width < 900 && `0 5px 0 0`}
                        al={`flex-start`}
                      >
                        <Text
                          fontSize={width < 900 ? `16px` : `18px`}
                          fontWeight={`600`}
                          margin={`23px 0 12px`}
                        >
                          {data.name}
                        </Text>

                        <Text fontSize={width < 900 ? `13px` : `17px`}>
                          {data.subName}
                        </Text>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={`16px 0 20px`}
                          fontSize={width < 900 ? `14px` : `20px`}
                        >
                          <Text
                            color={Theme.grey_C}
                            className="line"
                            margin={width < 900 ? `0 6px 0 0` : `0 12px 0 0`}
                          >
                            {data.viewCalcPrice}
                          </Text>
                          <Text>{data.viewPrice}</Text>
                        </Wrapper>
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Image
                            alt="heart icon"
                            src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                            width={`22px`}
                            margin={`0 18px 0 0`}
                          />
                          <Image
                            alt="cart icon"
                            src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_cart.png`}
                            width={`22px`}
                          />
                        </Wrapper>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}
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
      type: GET_PRODUCT_REQUEST,
      data: {
        isBest: 1,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
