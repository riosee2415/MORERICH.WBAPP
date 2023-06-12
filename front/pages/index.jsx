import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import BestSlider from "../components/slide/BestSlider";
import NewSlider from "../components/slide/NewSlider";
import SteadySlider from "../components/slide/SteadySlider";
import { GET_SLIDE_REQUEST } from "../reducers/banner";
import { useCallback } from "react";
import { CART_LIST_REQUEST } from "../reducers/cart";
import { LIKE_CREATE_REQUEST } from "../reducers/wish";
import { message } from "antd";
import { NEW_BANNER_REQUEST } from "../reducers/newbanner";

const Box = styled(Wrapper)`
  width: calc(100% / 3);
  cursor: pointer;
  position: relative;
  overflow: ${(props) => props.overflow || `hidden`};

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transition: 0.5s;
  }

  & ${Wrapper} {
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }

  &:hover ${Wrapper} {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { slides } = useSelector((state) => state.banner);
  const { banners } = useSelector((state) => state.newbanner);
  const { st_likeCreateDone, st_likeCreateError } = useSelector(
    (state) => state.wish
  );

  ////// HOOKS //////
  const width = useWidth();

  const [likeId, setLikeId] = useState(null);

  ////// REDUX //////
  const dispatch = useDispatch();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: GET_SLIDE_REQUEST,
      });
      if (likeId) {
        return message.success("좋아요 목록에 추가되었습니다.");
      } else {
        return message.success("좋아요가 취소되었습니다.");
      }
    }

    if (st_likeCreateError) {
      return message.error(st_likeCreateError);
    }
  }, [st_likeCreateDone, st_likeCreateError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper padding={`0 0 120px`}>
            <Mainslider />
            <Wrapper al={`flex-start`} margin={`103px 0 30px`}>
              <Text isPoppins fontSize={width < 900 ? `22px` : `34px`}>
                {slides[0] && slides[0].title}
              </Text>
            </Wrapper>
            <BestSlider
              datum={slides[0] && slides[0].connectArray}
              likeId={likeId}
              setLikeId={setLikeId}
            />
            <Image
              margin={`120px 0`}
              alt="banner img"
              src={
                width < 700
                  ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img_ad-ban_m.png`
                  : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img_ad-ban.png`
              }
            />
            <Wrapper al={`flex-start`} margin={`0 0 30px`}>
              <Text isPoppins fontSize={width < 900 ? `22px` : `34px`}>
                {slides[1] && slides[1].title}
              </Text>
            </Wrapper>
            <NewSlider
              datum={slides[1] && slides[1].connectArray}
              likeId={likeId}
              setLikeId={setLikeId}
            />
            <Wrapper dr={`row`} margin={`120px 0`}>
              {banners &&
                banners.map((data) => {
                  return (
                    <Box
                      key={data.id}
                      onClick={() => moveLinkHandler(data.url)}
                    >
                      <Image alt="thubnail" src={data.imagePath} />

                      <Wrapper
                        bgColor={`rgba(0, 0, 0, 0.3)`}
                        color={Theme.white_C}
                        position={`absolute`}
                        top={`0`}
                        left={`0`}
                        height={`100%`}
                        al={`flex-start`}
                        ju={`flex-end`}
                        padding={`40px`}
                      >
                        <Text fontSize={`24px`} fontWeight={`600`}>
                          {data.info}
                        </Text>
                      </Wrapper>
                    </Box>
                  );
                })}
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 30px`}>
              <Text isPoppins fontSize={width < 900 ? `22px` : `34px`}>
                {slides[2] && slides[2].title}
              </Text>
            </Wrapper>
            <SteadySlider
              datum={slides[2] && slides[2].connectArray}
              likeId={likeId}
              setLikeId={setLikeId}
            />
          </RsWrapper>
          <Popup />
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
      type: GET_SLIDE_REQUEST,
    });

    context.store.dispatch({
      type: NEW_BANNER_REQUEST,
    });
    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
