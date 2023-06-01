import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  ADMINUSERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
  Checkbox,
  Drawer,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
  SearchForm,
  SearchFormItem,
  SettingBtn,
} from "../../../components/commonComponents";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import {
  ManageButton,
  ManageInput,
  ManagementTable,
  ManageDelButton,
  ManagementForm,
} from "../../../components/managementComponents";
import { END } from "redux-saga";
import { items } from "../../../components/AdminLayout";
import axios from "axios";
import {
  Text,
  Wrapper,
  PopWrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const TypeButton = styled(Button)`
  margin-right: 5px;
`;

const GuideDiv = styled.div`
  width: 100%;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
  margin-left: 3px;
`;

const PointText = styled.div`
  color: ${(props) => props.theme.adminTheme_4};
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Address = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const { users } = useSelector((state) => state.user);

  console.log(users);

  const [sameDepth, setSameDepth] = useState([]);

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight5)) {
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
  /////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();

  ////// HOOKS //////

  //   DRAWER
  const [isDrawer, setIsDrawer] = useState(false); // 배송지확인

  ////// USEEFFECT //////

  ////// TOGGLE //////

  ////// HANDLER //////

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

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "회원이름",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "닉네임",
      render: (data) => <div>{data.nickname}</div>,
    },
    {
      title: "이메일",
      render: (data) => <div>{data.email}</div>,
    },
    {
      title: "전화번호",
      render: (data) => <div>{data.mobile}</div>,
    },
    {
      title: "가입일",
      render: (data) => <div>{data.viewCreatedAt}</div>,
    },
    {
      title: "권한",
      render: (data) => <div>{data.viewLevel}</div>,
    },
    {
      title: "배송지",
      render: () => (
        <Button
          type="primary"
          size="small"
          onClick={() => setIsDrawer(!isDrawer)}
        >
          배송지확인
        </Button>
      ),
    },
  ];

  const addressCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "기본배송지",
      render: () => <div>기본배송지</div>,
      //   아니라면 -로 표시
    },
    {
      title: "우편번호",
      dataIndex: "postcode",
    },
    {
      title: "주소",
      dataIndex: "address",
    },
    {
      title: "상세주소",
      dataIndex: "detailAddress",
      width: `40%`,
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
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
      <Wrapper margin={`10px 0 0`}>
        <GuideUl>
          <GuideLi>
            해당 메뉴에서 홈페이지에 가입된 회원의 배송지정보를 확인 할 수
            있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>배송지 확인만 가능합니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding={`10px`}>
        <Wrapper
          padding="5px 15px"
          bgColor={Theme.adminLightGrey_C}
          margin={`0 0 10px`}
        >
          <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
            <ManageInput width="220px" placeholder="회원명으로 검색" />
            <ManageButton type="primary">검색</ManageButton>
            <ManageButton>검색초기화</ManageButton>
          </Wrapper>
        </Wrapper>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
        />
      </Wrapper>

      <Drawer
        visible={isDrawer}
        title="배송지 정보"
        width={`900px`}
        onClose={() => setIsDrawer(!isDrawer)}
      >
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={addressCol}
          dataSource={users ? users : []}
          size="small"
        />
      </Drawer>
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
      type: ADMINUSERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Address);
