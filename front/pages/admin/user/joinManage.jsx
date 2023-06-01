import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, message, Form } from "antd";
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
  GET_JOIN_SET_REQUEST,
  UP_JOIN_SET_REQUEST,
} from "../../../reducers/user";
import {
  ManageInput,
  ManagementForm,
  ManageButton,
} from "../../../components/managementComponents";

const JoinManage = ({}) => {
  const {
    st_loadMyInfoDone,
    me,
    joinSet,
    st_upJoinSetDone,
    st_upJoinSetError,
  } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [form] = Form.useForm();

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
    if (st_upJoinSetDone) {
      message.info("가입 시 적용정보가 수정되었습니다.");
    }

    if (st_upJoinSetError) {
      return message.error(st_upJoinSetError);
    }
  }, [st_upJoinSetDone, st_upJoinSetError]);

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

  useEffect(() => {
    if (joinSet) {
      form.setFieldsValue({
        point: joinSet.point,
        pointPer: joinSet.pointPer,
        viewUpdatedAt: joinSet.viewUpdatedAt,
      });
    }
  }, [joinSet]);

  ////// HANDLER //////

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: UP_JOIN_SET_REQUEST,
        data: {
          id: joinSet.id,
          point: data.point,
          pointPer: data.pointPer,
        },
      });
    },
    [joinSet]
  );

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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            신규가입 시 지급되는 포인트 및 기본 포인트적립 퍼센트를 설정할 수
            있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            가입 시점 기준으로 데이터를 조회하기 때문에 소급적용되지 않습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="20px" al="flex-start">
        <Wrapper width="1000px" al="flex-start">
          <ManagementForm
            colon={false}
            wrapperCol={{ span: 20 }}
            labelCol={{ span: 4 }}
            form={form}
            onFinish={updateHandler}
          >
            <ManagementForm.Item
              label="신규지급 포인트"
              name="point"
              required={[{ required: true, message: "포인트는 필수입니다." }]}
            >
              <ManageInput type="number" />
            </ManagementForm.Item>

            <ManagementForm.Item
              label="신규지급 포인트율"
              name="pointPer"
              required={[{ required: true, message: "포인트율은 필수입니다." }]}
            >
              <ManageInput type="number" />
            </ManagementForm.Item>

            <ManagementForm.Item label="최근수정일" name="viewUpdatedAt">
              <ManageInput readOnly />
            </ManagementForm.Item>

            <Wrapper dr="row" ju="flex-end">
              <ManageButton type="primary" htmlType="submit">
                적용
              </ManageButton>
            </Wrapper>
          </ManagementForm>

          <Text color={Theme.red_C}>
            신규가입 시 옵션은 더 추가될 수 있습니다.
          </Text>
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
      type: GET_JOIN_SET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(JoinManage);
