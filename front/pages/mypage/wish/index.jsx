import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
  SquareBox,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { WISH_LIST_REQUEST } from "../../../reducers/mypage";
import { Empty, message } from "antd";
import { useRouter } from "next/router";
import { LIKE_CREATE_REQUEST } from "../../../reducers/wish";

const ProductWrapper = styled(Wrapper)`
  width: calc(100% / 3 - 44px);
  margin: 0 65px 60px 0;
  align-items: flex-start;

  &:nth-child(3n) {
    margin: 0 0 60px;
  }

  @media (max-width: 900px) {
    width: calc(100% / 2);
    margin: 0 0 50px;

    &:nth-child(3n) {
      margin: 0 0 50px;
    }

    &:nth-child(2n) {
      margin: 0 0px 50px;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { wishList } = useSelector((state) => state.mypage);
  const { st_likeCreateDone, st_likeCreateError } = useSelector(
    (state) => state.wish
  );

  const [isLikeState, setIsLikeState] = useState(false);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: WISH_LIST_REQUEST,
      });

      if (!isLikeState) {
        message.success("위시리스트에서 삭제되었습니다.");
      }
    }

    if (st_likeCreateError) {
      return message.error(st_likeCreateError);
    }
  }, [st_likeCreateDone, st_likeCreateError]);

  ////// TOGGLE //////

  ////// HANDLER //////
  // 좋아요
  const likeCreateHandler = useCallback(
    (data) => {
      setIsLikeState(data.isLike);

      dispatch({
        type: LIKE_CREATE_REQUEST,
        data: {
          ProductId: data.ProductId,
          id: data.id,
        },
      });
    },
    [isLikeState]
  );

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
                margin={width < 800 ? `0 0 15px` : `0 0 30px`}
              >
                위시리스트
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                {wishList && wishList.length === 0 ? (
                  <Wrapper padding={`100px 0`}>
                    <Empty description="조회된 내역이 없습니다." />
                  </Wrapper>
                ) : (
                  wishList.map((data, idx) => {
                    return (
                      <ProductWrapper key={idx}>
                        <SquareBox
                          onClick={() =>
                            movelinkHandler(`/product/${data.ProductId}`)
                          }
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
                              src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish_full.png`}
                              width={`22px`}
                              margin={`0 18px 0 0`}
                              onClick={() => likeCreateHandler(data)}
                            />
                          </Wrapper>
                        </Wrapper>
                      </ProductWrapper>
                    );
                  })
                )}
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

    context.store.dispatch({
      type: WISH_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
