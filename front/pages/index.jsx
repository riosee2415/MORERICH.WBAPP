import React, { useEffect } from "react";
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
`;

const Home = ({}) => {
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
        <title>MoreRich</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper padding={`0 0 120px`}>
            <Mainslider />
            <Wrapper al={`flex-start`} margin={`103px 0 30px`}>
              <Text isPoppins fontSize={`34px`}>
                Best Product
              </Text>
            </Wrapper>
            <BestSlider />
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
              <Text isPoppins fontSize={`34px`}>
                New Product
              </Text>
            </Wrapper>
            <NewSlider />
            <Wrapper dr={`row`} margin={`120px 0`}>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img_1.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img2.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img3.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img4.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img5.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
              <Box>
                <Image
                  alt="thubnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/main-page/img6.png`}
                />
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
                    hover 시 문구가 들어오는 곳입니다.
                  </Text>
                </Wrapper>
              </Box>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 30px`}>
              <Text isPoppins fontSize={`34px`}>
                Steady Product
              </Text>
            </Wrapper>
            <SteadySlider />
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
