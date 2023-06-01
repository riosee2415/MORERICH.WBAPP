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
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRODUCTTYPE_REQUEST,
  GET_PRODUCT_REQUEST,
} from "../../reducers/store";

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
  const { products, productTypes } = useSelector((state) => state.store);

  const [type, setType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_REQUEST,
      data: {
        ProductTypeId: type,
        page: currentPage,
      },
    });
  }, [type, currentPage]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const typeHandler = useCallback(
    (data) => {
      setCurrentPage(1);
    },
    [type, currentPage]
  );

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
              {productTypes && productTypes.length === 0 ? (
                <Wrapper fontSize={`16px`} color={Theme.grey_C}>
                  조회된 카테고리가 없습니다.
                </Wrapper>
              ) : (
                productTypes.map((data) => {
                  return (
                    <CateBtn
                      onClick={() => typeHandler(data.id)}
                      isActive={data.id === type}
                      key={data.id}
                    >
                      {data.value}
                    </CateBtn>
                  );
                })
              )}
            </Wrapper>
          </Wrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 20px`}>
              <Text color={Theme.grey_C}>000개의 상품이 존재합니다.</Text>
              <CustomSelect
                width={width < 900 ? `160px` : `225px`}
                height={`40px`}
              >
                <Select placeholder="선택해주세요">
                  <Select.Option>조회순</Select.Option>
                  <Select.Option>최신순</Select.Option>
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
                    <ProductWrapper key={idx}>
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
                            {data.price}
                          </Text>
                          <Text>{data.viewPrice}</Text>
                        </Wrapper>
                        <Wrapper dr={`row`} ju={`flex-start`}>
                          <Image
                            alt="heart icon"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                            width={`22px`}
                            margin={`0 18px 0 0`}
                          />
                          <Image
                            alt="cart icon"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_cart.png`}
                            width={`22px`}
                          />
                        </Wrapper>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}
            </Wrapper>

            <CustomPage />
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
    });

    context.store.dispatch({
      type: GET_PRODUCTTYPE_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
