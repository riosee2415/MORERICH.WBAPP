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
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { message, Modal, Select } from "antd";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import { PRODUCT_DETAIL_REQUEST } from "../../reducers/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CART_CREATE_REQUEST } from "../../reducers/cart";
import { useEffect } from "react";

const Index = () => {
  ////// GLOBAL STATE //////
  const { productDetail } = useSelector((s) => s.store);
  const { st_cartCreateDone, st_cartCreateError } = useSelector((s) => s.cart);
  ////// HOOKS //////
  const width = useWidth();

  // MODAL
  const [cartModal, setCartModal] = useState(false);

  // DATA
  const [currentDatum, setcurrentDatum] = useState([]); // 상품 선택
  const [optionData, setOptionData] = useState(null); // 옵션 데이터
  const [totalPrice, setTotalPrice] = useState(0); // 상품금액
  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();
  ////// USEEFFECT //////

  // 카드 후 처리
  useEffect(() => {
    if (st_cartCreateDone) {
      setCartModal(true);
      return;
    }

    if (st_cartCreateError) {
      return message.error(st_cartCreateError);
    }
  }, [st_cartCreateDone, st_cartCreateError]);

  ////// TOGGLE //////
  const cartModalToggle = useCallback(() => {
    setCartModal((prev) => !prev);
  }, [cartModal]);
  ////// HANDLER //////

  // 바로 구매
  const createHandler = useCallback(() => {
    let currentCheck = [];

    sessionStorage.setItem("BUY", JSON.stringify([productDetail]));
    sessionStorage.setItem(
      "TOTAL",
      JSON.stringify({
        totalPriceInt: resultPrice + 3500,
        totalPrice: String(resultPrice + 3500).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        qun: resultQun,
        productprice: String(resultPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      })
    );
  }, [currentDatum]);
  console.log(currentDatum);

  // 장바구니 담기
  const cartCreateHandler = useCallback(() => {
    let products = [];

    if (currentDatum.length === 0) {
      return message.error("옵션을 선택해주세요");
    }

    currentDatum.map((data) => {
      products.push({
        ProductId: router.query.id,
        ProductOptionId: data.id,
        qun: data.qun,
      });
    });

    dispatch({
      type: CART_CREATE_REQUEST,
      data: {
        products,
      },
    });
  }, [currentDatum]);

  // 수량 증가
  const optionQunUpdateHandler = useCallback(
    (data, num) => {
      const arr = currentDatum ? currentDatum.map((data) => data) : [];
      const currentId = arr.findIndex((value) => value.id === data.id);

      if (arr[currentId].qun + num <= 0) {
        arr[currentId].qun = 1;
      } else {
        arr[currentId].qun = arr[currentId].qun + num;
        setTotalPrice(
          totalPrice + num * (productDetail && productDetail.calcPrice)
        );
      }

      setcurrentDatum(arr);
    },
    [currentDatum, totalPrice, productDetail]
  );

  // 옵션 선택
  const optionCreateHandler = useCallback(
    (data) => {
      setOptionData(data);

      setTotalPrice(totalPrice + (productDetail && productDetail.calcPrice));

      let arr = currentDatum ? currentDatum.map((data) => data) : [];
      const currentId = arr.findIndex((value) => value.id === data[0]);

      if (currentId === -1) {
        arr.push({
          id: data[0],
          value: data[1],
          qun: 1,
        });
      } else {
        arr[currentId].qun = arr[currentId].qun + 1;
      }

      setcurrentDatum(arr);
    },
    [currentDatum, productDetail, totalPrice]
  );
  ////// DATAVIEW //////

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
              {productDetail &&
                productDetail.connectArray &&
                productDetail.connectArray.map((data, idx) => {
                  return (
                    <Image
                      key={idx}
                      alt="thumbnail"
                      margin={`0 0 20px`}
                      src={data.filepath}
                    />
                  );
                })}
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
                {productDetail && productDetail.name}
              </Text>
              <Text
                fontSize={width < 800 ? `18px` : `24px`}
                margin={`12px 0 19px`}
              >
                {productDetail && productDetail.subName}
              </Text>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`4px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 36px`}
              >
                <Wrapper width={`auto`} dr={`row`}>
                  {productDetail && productDetail.discount !== 0 && (
                    <Text
                      color={Theme.grey_C}
                      className="line"
                      margin={`0 12px 0 0`}
                      fontSize={width < 800 ? `14px` : `20px`}
                    >
                      {productDetail && productDetail.viewPrice}
                    </Text>
                  )}
                  <Text
                    fontSize={width < 800 ? `16px` : `28px`}
                    fontWeight={`bold`}
                  >
                    {productDetail && productDetail.viewCalcPrice}
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
                  {productDetail && productDetail.detail}
                </Text>
              </Wrapper>
              <CustomSelect
                width={`100%`}
                height={`55px`}
                margin={`34px 0`}
                sBorder={`1px solid ${Theme.black_C}`}
              >
                <Select
                  placeholder="옵션을 선택해주세요."
                  value={optionData && optionData[1]}
                  onChange={optionCreateHandler}
                >
                  {productDetail &&
                    productDetail.options &&
                    productDetail.options.map((data, idx) => {
                      return (
                        <Select.Option key={idx} value={[data.id, data.value]}>
                          {data.value}
                        </Select.Option>
                      );
                    })}
                </Select>
              </CustomSelect>

              {currentDatum.map((data) => {
                return (
                  <Wrapper
                    key={data.id}
                    bgColor={Theme.lightGrey2_C}
                    padding={width < 800 ? `20px 15px` : `30px 20px`}
                    al={`flex-start`}
                    margin={`0 0 32px`}
                  >
                    <Text fontSize={width < 800 ? `14px` : `16px`}>
                      {productDetail && productDetail.name} - {data.value}
                    </Text>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      margin={`12px 0 0`}
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
                          onClick={() => optionQunUpdateHandler(data, -1)}
                        >
                          <Text isHover>
                            <MinusOutlined />
                          </Text>
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
                          onClick={() => optionQunUpdateHandler(data, +1)}
                        >
                          <Text isHover>
                            <PlusOutlined />
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Text
                        fontSize={width < 800 ? `14px` : `18px`}
                        fontWeight={`600`}
                      >
                        {String(
                          data.qun * (productDetail && productDetail.calcPrice)
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </Wrapper>
                  </Wrapper>
                );
              })}
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text fontSize={width < 800 ? `14px` : `20px`}>Total</Text>
                <Text
                  fontSize={width < 800 ? `16px` : `28px`}
                  fontWeight={`bold`}
                >
                  {currentDatum.length === 0
                    ? productDetail && productDetail.viewCalcPrice
                    : String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                  onClick={cartCreateHandler}
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

          <Modal onCancel={cartModalToggle} visible={cartModal} footer={null}>
            <Wrapper padding={width < 800 ? `30px 0` : `50px 0`}>
              <Text fontSize={`28px`} fontWeight={`600`}>
                CART
              </Text>
              <Text fontSize={`16px`} margin={`30px 0`}>
                카트에 상품이 담겼습니다.
              </Text>
              <Wrapper dr={`row`}>
                <CommonButton
                  width={width < 800 ? `130px` : `170px`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  kindOf={`white`}
                  margin={`0 4px 0 0`}
                  onClick={() => router.push(`/cart`)}
                >
                  카트 바로가기
                </CommonButton>
                <CommonButton
                  width={width < 800 ? `130px` : `170px`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  margin={`0 0 0 4px`}
                  onClick={() => setCartModal(false)}
                >
                  계속 쇼핑하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
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
      type: PRODUCT_DETAIL_REQUEST,
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
