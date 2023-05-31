import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, message, Popconfirm, Checkbox } from "antd";
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
  ManageButton,
  ManageInput,
  ManagementTable,
} from "../../../components/managementComponents";
import { GET_PRODUCTTYPE_REQUEST } from "../../../reducers/store";

const Product = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { productTypes } = useSelector((state) => state.store);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상점관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [typeId, setTypeId] = useState(0);

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
      width: "5%",
    },
    {
      title: "유형명",
      render: (row) => (
        <PTypeWorkInput compare="value" initValue={row.value} row={row} />
      ),
      sorter: (a, b) => a.value.localeCompare(b.value),
      width: "30%",
    },

    {
      title: "등록일",
      dataIndex: "viewCreatedAt",
      sorter: {
        compare: (a, b) => a.sortCreatedAt - b.sortCreatedAt,
        multiple: 3,
      },
    },
    {
      title: "최근수정",
      dataIndex: "viewUpdatedAt",
      sorter: {
        compare: (a, b) => a.sortUpdatedAt - b.sortUpdatedAt,
        multiple: 3,
      },
    },

    {
      title: "보유상품 수",
      render: (row) => <div>{row.productCnt}개</div>,
      sorter: {
        compare: (a, b) => a.productCnt - b.productCnt,
        multiple: 3,
      },
    },

    {
      title: "컨트롤",
      render: (row) => (
        <Popconfirm
          title={`${row.value} 상품유형을 삭제하시겠습니까?`}
          okText="삭제"
          cancelText="취소"
          onCancel={null}
          onConfirm={() => delHandler(row)}
        >
          <ManageDelButton type="dashed">삭제</ManageDelButton>
        </Popconfirm>
      ),
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
          <GuideLi>판매 중 인 상품을 괸리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            상품데이터는 구매시점의 데이터에 의거하기 때문에 현 데이터와
            구매내역의 데이터가 다를 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper>
        <Wrapper padding="5px 15px" bgColor={Theme.adminLightGrey_C}>
          <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
            <ManageInput width="220px" placeholder="상품명으로 검색" />
            <ManageButton type="primary">검색</ManageButton>
            <ManageButton>검색초기화(R)</ManageButton>
          </Wrapper>

          <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
            <Checkbox>신상품</Checkbox>
            <Checkbox>베스트</Checkbox>
            <Checkbox>추천상품</Checkbox>
          </Wrapper>

          <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
            <ManageButton
              type={typeId === 0 ? "primary" : "default"}
              onClick={() => setTypeId(0)}
            >
              전체
            </ManageButton>
            {productTypes.map((item) => {
              return (
                <ManageButton
                  type={typeId === item.id ? "primary" : "default"}
                  onClick={() => setTypeId(item.id)}
                >
                  {item.value}
                </ManageButton>
              );
            })}
          </Wrapper>
        </Wrapper>

        <Wrapper
          dr="row"
          margin="0px 0px 5px 0px"
          ju="flex-end"
          padding="0px 10px"
        >
          <ManageButton type="primary">신규상품 + (N)</ManageButton>
        </Wrapper>

        <Wrapper padding="10px">
          <ManagementTable columns={column} dataSource={[]} rowKey={"num"} />
        </Wrapper>
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
      type: GET_PRODUCTTYPE_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Product);
