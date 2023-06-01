import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, message } from "antd";
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
import {
  ManageInput,
  ManageButton,
  ManageDelButton,
  ManagementForm,
  ManagementTable,
} from "../../../components/managementComponents";
import { GET_BOUGHTLIST_REQUEST } from "../../../reducers/store";

const Bought = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { boughtlist } = useSelector((state) => state.store);

  console.log(boughtlist);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상점관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [stat, setStat] = useState(0);
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

      if (!(me && me.menuRight8)) {
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
  const column = [
    {
      title: "번호",
      dataIndex: "num",
      width: "3%",
    },

    {
      title: "구매자정보",
      dataIndex: "userId",
    },

    {
      title: "구매일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "구매금액",
      dataIndex: "allPrice",
    },

    {
      title: "구매상품 수",
      dataIndex: "productCnt",
    },

    {
      title: "처리상태",
      dataIndex: "productCnt",
    },

    {
      title: "배송회사",
      dataIndex: "productCnt",
    },

    {
      title: "송장번호",
      dataIndex: "productCnt",
    },

    {
      title: "취소/환불처리",
      dataIndex: "productCnt",
    },

    {
      title: "구매상품 상세",
      dataIndex: "productCnt",
    },
  ];

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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            현재 주문내역을 확인하고 배송정보를 등록할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            상품정보가 수정 된 경우 주문내역과 현 시점의 상품정보는 다를 수
            있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="10px">
        <Wrapper>
          <Wrapper
            padding="5px 15px"
            bgColor={Theme.adminLightGrey_C}
            margin={`0 0 10px`}
          >
            <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
              <ManageInput
                width="220px"
                placeholder="구매자 아이디"
                value={""}
                onKeyDown={null}
              />
              <ManageInput
                width="220px"
                placeholder="날짜"
                value={"2023-05-03"}
                type="date"
                onKeyDown={null}
              />
              <ManageButton type="primary" onClick={null}>
                검색
              </ManageButton>
            </Wrapper>

            <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
              <ManageButton
                type={stat === 0 ? "primary" : "default"}
                onClick={() => setStat(0)}
              >
                상품 준비중
              </ManageButton>

              <ManageButton
                type={stat === 1 ? "primary" : "default"}
                onClick={() => setStat(1)}
              >
                배송 준비중
              </ManageButton>

              <ManageButton
                type={stat === 2 ? "primary" : "default"}
                onClick={() => setStat(2)}
              >
                배송중
              </ManageButton>

              <ManageButton
                type={stat === 3 ? "primary" : "default"}
                onClick={() => setStat(3)}
              >
                배송완료
              </ManageButton>

              <ManageButton
                type={stat === 4 ? "primary" : "default"}
                onClick={() => setStat(4)}
              >
                취소/환불
              </ManageButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        {/*  */}

        <ManagementTable
          columns={column}
          dataSource={boughtlist}
          rowKey={"num"}
        />
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
      type: GET_BOUGHTLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Bought);
