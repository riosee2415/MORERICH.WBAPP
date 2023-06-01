import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Image, Popover, message } from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { GET_SLIDE_REQUEST } from "../../../reducers/banner";
import { ManageButton } from "../../../components/managementComponents";

const Slide = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { slides } = useSelector((state) => state.banner);

  console.log(slides);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;
        if (!data.useYn) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight3)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  ////// HANDLER //////

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            메인화면에 보여지는 단락 별 슬라이드의 제목과 상품을 제어할 수
            있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            슬라이드 데이터는 화면에 즉시 반영됩니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="15px">
        {slides.map((item) => {
          return (
            <Wrapper
              key={item.id}
              al="flex-start"
              margin="0px 0px 50px 0px"
              borderBottom={`1px solid ${Theme.grey3_C}`}
              padding="5px"
            >
              <Wrapper dr="row" ju="flex-start">
                <Text margin="0px 10px 0px 0px" fontSize="18px">
                  {item.title}
                </Text>
                <ManageButton>타이틀 수정</ManageButton>
              </Wrapper>

              <Wrapper
                bgColor={Theme.adminLightGrey_C}
                padding="5px"
                dr="row"
                wrap="wrap"
                ju="flex-start"
              >
                {/*  */}
                {item.connectArray.map((inItem) => {
                  return (
                    <Wrapper width="140px" height="160px" margin="3px">
                      <Image
                        src={inItem.thumbnail}
                        width="140px"
                        height="140px"
                        alt="image"
                        style={{ objectFit: "cover" }}
                      />
                      <Wrapper height="20px">{inItem.name}</Wrapper>
                    </Wrapper>
                  );
                })}

                {/*  */}
              </Wrapper>
            </Wrapper>
          );
        })}
      </Wrapper>
    </AdminLayout>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Slide);
