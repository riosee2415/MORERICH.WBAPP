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
import { Checkbox, Empty, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CART_DELETE_REQUEST,
  CART_LIST_REQUEST,
  CART_QUN_UPDATE_REQUEST,
} from "../../reducers/cart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const {
    cartList,
    //
    st_cartDeleteDone,
    st_cartDeleteError,
    //
    st_cartQunUpdateDone,
    st_cartQunUpdateError,
  } = useSelector((state) => state.cart);
  ////// HOOKS //////
  const width = useWidth();

  const [resultPrice, setResultPrice] = useState(0); // 총 상품금액
  const [allCheck, setAllCheck] = useState(true); // 전체체크
  const [currentCheck, setCurrentCheck] = useState([]); // 개별체크
  const [resultQun, setResulQun] = useState(1); // 총 수량
  ////// REDUX //////

  const dispatch = useDispatch();
  const router = useRouter();

  ////// USEEFFECT //////

  useEffect(() => {
    if (cartList) {
      setCurrentCheck(cartList);
    }
  }, [cartList]);

  useEffect(() => {
    if (st_cartQunUpdateDone) {
      dispatch({
        type: CART_LIST_REQUEST,
      });

      return;
    }

    if (st_cartQunUpdateError) {
      return message.error(st_cartQunUpdateError);
    }
  }, [st_cartQunUpdateDone, st_cartQunUpdateError]);

  useEffect(() => {
    if (st_cartDeleteDone) {
      dispatch({
        type: CART_LIST_REQUEST,
      });
      return message.success("장바구니 상품이 삭제되었습니다.");
    }

    if (st_cartDeleteError) {
      return message.error(st_cartDeleteError);
    }
  }, [st_cartDeleteDone, st_cartDeleteError]);

  useEffect(() => {
    if (currentCheck.length === cartList.length) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [currentCheck, cartList]);

  useEffect(() => {
    if (currentCheck) {
      let result = 0;
      let qun = 0;

      currentCheck.map((data) => {
        qun = qun + data.qun;
        result = result + data.totalPrice;
      });

      setResultPrice(result);
      setResulQun(qun);
    }
  }, [currentCheck]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 전체구매
  const allCreateHandler = useCallback(() => {
    if (cartList.length === 0) {
      return message.error("구매할 상품이 없습니다.");
    }

    let result = 0;
    let qun = 0;

    cartList.map((data) => {
      qun = qun + data.qun;
      result = result + data.totalPrice;
    });

    sessionStorage.setItem("BUY", JSON.stringify(cartList));
    sessionStorage.setItem(
      "TOTAL",
      JSON.stringify({
        totalPriceInt: result + 2500,
        totalPrice: String(result + 2500).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        qun: qun,
        productprice: String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      })
    );
    router.push(`/order`);
  }, [cartList]);

  // 선택구매
  const selectCreateHandler = useCallback(() => {
    if (currentCheck.length === 0) {
      return message.error("선택한 상품이 없습니다.");
    }

    sessionStorage.setItem("BUY", JSON.stringify(currentCheck));
    sessionStorage.setItem(
      "TOTAL",
      JSON.stringify({
        totalPriceInt: resultPrice + 2500,
        totalPrice: String(resultPrice + 2500).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        qun: resultQun,
        productprice: String(resultPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      })
    );
    router.push(`/order`);
  }, [currentCheck, resultPrice, resultQun]);

  // 장바구니 수량 수정
  const cartUpdateHandler = useCallback((data, num) => {
    dispatch({
      type: CART_QUN_UPDATE_REQUEST,
      data: {
        id: data.id,
        qun: data.qun + num,
      },
    });
  }, []);

  // 장바구니 삭제하기
  const cartDeleteHandler = useCallback(() => {
    if (currentCheck.length === 0) {
      return message.error("삭제할 상품을 선택해주세요.");
    }

    let cartIds = [];

    currentCheck.map((data) => {
      cartIds.push(data.id);
    });

    dispatch({
      type: CART_DELETE_REQUEST,
      data: {
        cartIds,
      },
    });
  }, [currentCheck]);

  // 하나씩체크
  const checkHandler = useCallback(
    (data) => {
      let arr = currentCheck ? currentCheck.map((data) => data) : [];
      const currentId = arr.findIndex((value) => value.id === data.id);

      if (currentId === -1) {
        arr.push(data);
      } else {
        arr.splice(currentId, 1);
      }

      setCurrentCheck(arr);
    },
    [currentCheck]
  );

  // 전체체크
  const allCheckHandler = useCallback(() => {
    if (allCheck) {
      setAllCheck(false);
      setCurrentCheck([]);
    } else {
      setAllCheck(true);
      setCurrentCheck(cartList);
    }
  }, [cartList, allCheck]);

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
              <CommonButton
                width={`100px`}
                height={`32px`}
                kindOf={`white`}
                onClick={cartDeleteHandler}
              >
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
                <Checkbox onChange={allCheckHandler} checked={allCheck} />
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

            {cartList.length === 0 ? (
              <Wrapper height={`200px`}>
                <Empty description="장바구니에 상품이 없습니다." />
              </Wrapper>
            ) : (
              cartList.map((data) => {
                console.log(data);
                return (
                  <Wrapper
                    key={data.id}
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.black_C}`}
                    fontSize={`16px`}
                    padding={`22px 0`}
                  >
                    <Wrapper width={width < 900 ? `10%` : `5%`}>
                      <Checkbox
                        onChange={() => checkHandler(data)}
                        checked={currentCheck.find(
                          (value) => value.id === data.id
                        )}
                      />
                    </Wrapper>
                    <Wrapper width={width < 900 ? `90%` : `53%`} dr={`row`}>
                      <Image
                        alt="thumbnail"
                        width={width < 900 ? `80px` : `112px`}
                        src={data.thumbnail}
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
                          {data.name}
                        </Text>
                        <Text
                          fontSize={width < 900 ? `14px` : `17px`}
                          minHeight={`45px`}
                        >
                          {data.subName}
                        </Text>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                        >
                          옵션 : {data.optionName}
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
                                onClick={() => cartUpdateHandler(data, -1)}
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
                                {data.qun}
                              </Wrapper>
                              <Wrapper
                                width={`30px`}
                                cursor={`pointer`}
                                height={`30px`}
                                fontSize={`12px`}
                                onClick={() => cartUpdateHandler(data, +1)}
                              >
                                <PlusOutlined />
                              </Wrapper>
                            </Wrapper>
                            <Text>{data.concatTotalPrice}</Text>
                          </>
                        )}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`14%`}
                      display={width < 900 ? `none` : `flex`}
                    >
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
                          onClick={() => cartUpdateHandler(data, -1)}
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
                          {data.qun}
                        </Wrapper>
                        <Wrapper
                          width={`30px`}
                          cursor={`pointer`}
                          height={`30px`}
                          fontSize={`12px`}
                          onClick={() => cartUpdateHandler(data, +1)}
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
                      {data.concatTotalPrice}
                    </Wrapper>
                    <Wrapper
                      width={`14%`}
                      display={width < 900 ? `none` : `flex`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                    >
                      2,500원
                    </Wrapper>
                  </Wrapper>
                );
              })
            )}

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
                  {String(resultPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
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
                  2,500원
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
                  {String(resultPrice + 2500).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  원
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
                onClick={selectCreateHandler}
              >
                선택구매
              </CommonButton>
              <CommonButton
                width={width < 800 ? `150px` : `260px`}
                fontSize={width < 900 ? `15px` : `20px`}
                fontWeight={`600`}
                height={`60px`}
                margin={`0 0 0 5px`}
                onClick={allCreateHandler}
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

    context.store.dispatch({
      type: CART_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
