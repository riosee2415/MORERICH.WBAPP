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
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Empty, message, Select, Spin } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRODUCTTYPE_REQUEST,
  GET_PRODUCT_REQUEST,
  GET_TYPE_2DEPTH_REQUEST,
} from "../../reducers/store";
import { useRouter } from "next/router";
import { LIKE_CREATE_REQUEST } from "../../reducers/wish";
import { LOGO_GET_REQUEST } from "../../reducers/logo";
import { COMPANY_GET_REQUEST } from "../../reducers/company";

const CateBtn = styled(Wrapper)`
  padding: 0 14px;
  width: auto;
  height: 30px;
  border-radius: 30px;
  font-size: 16px;
  border: ${(props) =>
    props.isActive ? `1px solid ${Theme.black_C}` : `none`};
  margin: 0 6px 5px;

  &:hover {
    cursor: pointer;
    color: ${Theme.grey_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const {
    products,
    productTypes,
    productType2Depth,
    st_getProductLoading,
    st_getProductDone,
  } = useSelector((state) => state.store);
  const { me } = useSelector((state) => state.user);
  const { st_likeCreateDone, st_likeCreateError } = useSelector(
    (state) => state.wish
  );

  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);
  const [orderType, setOrderType] = useState(1); // 순서

  const [proLen, setProLen] = useState(0);

  const [likeId, setLikeId] = useState(null);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
      });
      if (likeId === null) {
        return message.success("좋아요가 취소되었습니다.");
      } else {
        return message.success("좋아요 목록에 추가되었습니다.");
      }
    }

    if (st_likeCreateError) {
      return message.error(st_likeCreateError);
    }
  }, [st_likeCreateDone, st_likeCreateError]);

  useEffect(() => {
    if (router.query) {
      setType(parseInt(router.query.target));
      if (router.query.target2 === "false") {
        setType2(false);
      } else {
        setType2(parseInt(router.query.target2));
      }
    } else {
      return;
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query.target) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: type,
          orderType: orderType,
          ProductType2Id: type2 ? type2 : false,
        },
      });

      dispatch({
        type: GET_TYPE_2DEPTH_REQUEST,
        data: {
          TypeId: router.query.target,
        },
      });
    }
  }, [router.query, type, type2, orderType]);

  useEffect(() => {
    if (products) {
      let count = products.filter((data) => data.isStop === 0).length;

      setProLen(count);
    }
  }, [products]);

  ////// TOGGLE //////
  ////// HANDLER //////

  // 좋아요
  const likeCreateHandler = useCallback(
    (data) => {
      if (!me) {
        return message.error("로그인 후 이용할 수 있습니다.");
      }

      if (data.exWish !== null) {
        setLikeId(null);
      } else {
        setLikeId(data.ProductId);
      }

      dispatch({
        type: LIKE_CREATE_REQUEST,
        data: {
          ProductId: data.id,
          id: data.exWish,
        },
      });
    },
    [likeId, me]
  );

  const typeHandler = useCallback((data) => {
    router.push(`/product?target=${data}`);

    if (data === 0) {
      setType2(false);
      setType(false);
    } else {
      setType(parseInt(data));
      setType2(false);
    }
  }, []);

  const typeHandler2 = useCallback(
    (data) => {
      router.push(`/product?target=${type}&target2=${data}`);

      if (data === false) {
        setType2(data);
      } else {
        setType2(parseInt(data));
      }
    },
    [type]
  );

  // 순서
  const orderTypeHandler = useCallback((data) => {
    setOrderType(data);
  }, []);

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | PRODUCT</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper bgColor={Theme.lightGrey2_C} padding={`50px 0`}>
            <Text
              isPoppins
              fontSize={width < 900 ? `22px` : `34px`}
              fontWeight={`600`}
            >
              PRODUCT
            </Text>
            <Wrapper dr={`row`} margin={`18px 0 0`}>
              <CateBtn onClick={() => typeHandler(0)} isActive={false === type}>
                전체
              </CateBtn>
              {productTypes && productTypes.length === 0 ? (
                <Wrapper fontSize={`16px`} color={Theme.grey_C}>
                  조회된 카테고리가 없습니다.
                </Wrapper>
              ) : (
                productTypes.map((data) => {
                  if (data.isHide === 0) {
                    return (
                      <CateBtn
                        onClick={() => typeHandler(data.id)}
                        isActive={data.id === type}
                        key={data.id}
                      >
                        {data.value}
                      </CateBtn>
                    );
                  }
                })
              )}
            </Wrapper>
          </Wrapper>
          <RsWrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.black_C}`}
              dr={`row`}
              margin={`30px 0 0`}
              fontSize={width < 900 ? `16px` : `18px`}
            >
              <Wrapper
                width={`auto`}
                height={`35px`}
                padding={`0 15px`}
                radius={`30px`}
                margin={`0 20px 10px 0`}
                color={false === type2 ? Theme.white_C : Theme.black_C}
                bgColor={false === type2 ? Theme.black_C : Theme.white_C}
                cursor={`pointer`}
                fontWeight={false === type2 ? `bold` : ``}
                onClick={() => typeHandler2(false)}
              >
                전체
              </Wrapper>

              {productType2Depth && productType2Depth.length === 0 ? (
                <Wrapper
                  width={`auto`}
                  margin={`0 20px 10px 0`}
                  color={Theme.grey_C}
                >
                  조회된 카테고리가 없습니다.
                </Wrapper>
              ) : (
                productType2Depth &&
                productType2Depth.map((data) => {
                  return (
                    <Wrapper
                      width={`auto`}
                      height={`35px`}
                      padding={`0 15px`}
                      radius={`30px`}
                      onClick={() => typeHandler2(data.id)}
                      margin={`0 20px 10px 0`}
                      key={data.id}
                      fontWeight={data.id === type2 ? `bold` : ``}
                      color={data.id === type2 ? Theme.white_C : Theme.black_C}
                      bgColor={
                        data.id === type2 ? Theme.black_C : Theme.white_C
                      }
                      cursor={`pointer`}
                    >
                      {data.value}
                    </Wrapper>
                  );
                })
              )}
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 20px`}>
              <Text color={Theme.grey_C}>{proLen}개의 상품이 존재합니다.</Text>
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
                  <Spin />
                  <Text fontSize={`20px`} margin={`15px 0 0`}>
                    데이터를 불러오는 중입니다.
                  </Text>
                </Wrapper>
              ) : (
                products.map((data, idx) => {
                  return (
                    data.isStop === 0 && (
                      <ProductWrapper key={idx}>
                        <SquareBox
                          onClick={() => movelinkHandler(`/product/${data.id}`)}
                        >
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
                            {/* {data.discount !== 0 && (
                            <Text
                              color={Theme.grey_C}
                              className="line"
                              margin={width < 900 ? `0 6px 0 0` : `0 12px 0 0`}
                            >
                              {data.viewPrice}
                            </Text>
                          )} */}
                            <Text>{data.viewCalcPrice}</Text>
                          </Wrapper>
                          <Wrapper dr={`row`} ju={`flex-start`}>
                            {data.exWish ? (
                              <Image
                                alt="heart icon"
                                src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish_full.png`}
                                width={`22px`}
                                margin={`0 18px 0 0`}
                                onClick={() => likeCreateHandler(data)}
                              />
                            ) : (
                              <Image
                                alt="heart icon"
                                src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                                width={`22px`}
                                margin={`0 18px 0 0`}
                                onClick={() => likeCreateHandler(data)}
                              />
                            )}
                            {/* <Image
                            alt="cart icon"
                            src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_cart.png`}
                            width={`22px`}
                          /> */}
                          </Wrapper>
                        </Wrapper>
                      </ProductWrapper>
                    )
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
      type: GET_PRODUCTTYPE_REQUEST,
    });

    context.store.dispatch({
      type: LOGO_GET_REQUEST,
    });

    context.store.dispatch({
      type: COMPANY_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
