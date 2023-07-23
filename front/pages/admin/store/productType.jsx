import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, message, Popconfirm, Drawer, Spin, Switch } from "antd";
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
import {
  ManagementTable,
  ManageButton,
  TitleTag,
  SubTitleTag,
  ManageInput,
  ManageDelButton,
} from "../../../components/managementComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  GET_PRODUCTTYPE_REQUEST,
  NEW_PRODUCTTYPE_REQUEST,
  DEL_PRODUCTTYPE_REQUEST,
  GET2_PRODUCTTYPE_REQUEST,
  GET_TYPE_2DEPTH_REQUEST,
  DEL_TYPE_2DEPTH_REQUEST,
  NEW_TYPE_2DEPTH_REQUEST,
  TYPE_HIDE_TOGGLE_REQUEST,
} from "../../../reducers/store";
import PTypeWorkInput from "../../../components/admin/PTypeWorkInput";
import PTypeWorkInput2 from "../../../components/admin/PTypeWorkInput2";
import BarChart from "../../../components/admin/BarChart";

const ProductType = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    productTypes,
    productType2Depth,
    productTypes2,
    //
    st_newProductTypeLoading,
    st_newProductTypeDone,
    st_newProductTypeError,
    //
    st_modifyProductTypeDone,
    st_modifyProductTypeError,
    //
    st_delProductTypeDone,
    st_delProductTypeError,
    //
    st_getProductType2Loading,
    //
    st_delProductType2DepthDone,
    //
    st_newProductType2DepthDone,
    //
    st_typeHideToggleDone,
    st_typeHideToggleError,
  } = useSelector((state) => state.store);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상점관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [newView, setNewView] = useState(false);
  const [newValue, setNewValue] = useState("");

  const [newView2, setNewView2] = useState(false);
  const [newValue2, setNewValue2] = useState("");

  const [graphView, setGraphView] = useState(false);

  const [currentRow, setCurrentRow] = useState(null);

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

  useEffect(() => {
    if (st_delProductType2DepthDone && currentRow) {
      dispatch({
        type: GET_TYPE_2DEPTH_REQUEST,
        data: {
          TypeId: currentRow.id,
        },
      });
    }
  }, [st_delProductType2DepthDone]);

  useEffect(() => {
    if (st_newProductType2DepthDone && currentRow) {
      setNewValue2("");
      dispatch({
        type: GET_TYPE_2DEPTH_REQUEST,
        data: {
          TypeId: currentRow.id,
        },
      });
    }
  }, [st_newProductType2DepthDone]);

  const get2DepthHandler = useCallback((row) => {
    setCurrentRow(row);
    dispatch({
      type: GET_TYPE_2DEPTH_REQUEST,
      data: {
        TypeId: row.id,
      },
    });
  }, []);

  const blankKey = (e) => {
    // if (e.keyCode === 78) {
    //   setNewValue("");
    //   setNewView((p) => !p);
    // }
    // if (e.keyCode === 83) {
    //   graphToggle();
    // }
  };

  ////// HOOKS //////

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_newProductTypeDone) {
      dispatch({
        type: GET_PRODUCTTYPE_REQUEST,
      });

      setNewView(false);
      setNewValue("");

      return message.info("새로운 유형이 등록되었습니다.");
    }

    if (st_newProductTypeError) {
      return message.error(st_newProductTypeError);
    }
  }, [st_newProductTypeError, st_newProductTypeDone]);

  useEffect(() => {
    if (st_typeHideToggleDone) {
      dispatch({
        type: GET_PRODUCTTYPE_REQUEST,
      });
    }

    if (st_typeHideToggleError) {
      return message.error(st_typeHideToggleError);
    }
  }, [st_typeHideToggleError, st_typeHideToggleDone]);

  useEffect(() => {
    if (st_modifyProductTypeDone) {
      dispatch({
        type: GET_PRODUCTTYPE_REQUEST,
      });

      return message.info("유형이 수정되었습니다.");
    }

    if (st_modifyProductTypeError) {
      return message.error(st_modifyProductTypeError);
    }
  }, [st_modifyProductTypeDone, st_modifyProductTypeError]);

  useEffect(() => {
    if (st_delProductTypeDone) {
      dispatch({
        type: GET_PRODUCTTYPE_REQUEST,
      });

      return message.info("유형이 삭제되었습니다.");
    }

    if (st_delProductTypeError) {
      return message.error(st_delProductTypeError);
    }
  }, [st_delProductTypeDone, st_delProductTypeError]);

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
    window.addEventListener("keydown", blankKey);

    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  ////// HANDLER //////

  const graphToggle = useCallback(() => {
    setGraphView((p) => !p);

    if (!graphView) {
      dispatch({
        type: GET2_PRODUCTTYPE_REQUEST,
      });
    }
  }, [graphView]);

  const newHandler = useCallback(() => {
    if (newValue === "") {
      return message.error("유형명은 필수 입니다.");
    }

    dispatch({
      type: NEW_PRODUCTTYPE_REQUEST,
      data: {
        value: newValue,
      },
    });
  }, [newValue]);

  const newHandler2 = useCallback(() => {
    if (newValue2 === "") {
      return message.error("유형명은 필수 입니다.");
    }

    dispatch({
      type: NEW_TYPE_2DEPTH_REQUEST,
      data: {
        value: newValue2,
        ProductTypeId: currentRow.id,
      },
    });
  }, [newValue2, currentRow]);

  const onNewKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        newHandler();
      }
    },
    [newValue]
  );

  const onNewKeyDown2 = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        newHandler2();
      }
    },
    [newValue2]
  );

  const delHandler = useCallback((row) => {
    if (row.productCnt > 0) {
      return message.error(
        "해당 유형에 상품이 보유되어있어 삭제할 수 없습니다."
      );
    }

    dispatch({
      type: DEL_PRODUCTTYPE_REQUEST,
      data: {
        id: row.id,
        value: row.value,
      },
    });
  }, []);

  const delHandler2 = useCallback((row) => {
    dispatch({
      type: DEL_TYPE_2DEPTH_REQUEST,
      data: {
        id: row.id,
      },
    });
  }, []);

  const dataToggleUpdate = useCallback((e, row) => {
    const nextFlag = e ? 1 : 0;

    dispatch({
      type: TYPE_HIDE_TOGGLE_REQUEST,
      data: {
        targetId: row.id,
        nextFlag,
      },
    });
  }, []);

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
      title: "유형 숨기기",
      render: (row) => (
        <Switch
          checked={row.isHide}
          onChange={(e) => dataToggleUpdate(e, row)}
        />
      ),
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

    {
      title: "하위 카테고리",
      render: (row) => (
        <ManageButton type="primary" onClick={() => get2DepthHandler(row)}>
          관리
        </ManageButton>
      ),
    },
  ];

  const column2 = [
    {
      title: "번호",
      dataIndex: "num",
      width: "5%",
    },
    {
      title: "유형명",
      render: (row) => (
        <PTypeWorkInput2 compare="value" initValue={row.value} row={row} />
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
      title: "컨트롤",
      render: (row) => (
        <Popconfirm
          title={`${row.value} 상품유형을 삭제하시겠습니까?`}
          okText="삭제"
          cancelText="취소"
          onCancel={null}
          onConfirm={() => delHandler2(row)}
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
          <GuideLi>상품유형은 사용자 화면 메뉴에 직결반영 됩니다.</GuideLi>
          <GuideLi isImpo={true}>
            삭제 된 상품유형은 복구할 수 없으니, 신중한 처리가 필요합니다.
          </GuideLi>
        </GuideUl>

        <Wrapper padding="20px">
          <Wrapper margin="0px 0px 15px 0px" dr="row" ju="flex-end">
            {newView ? (
              <ManageInput
                width="220px"
                placeholder="새로운 유형을 입력하세요."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={onNewKeyDown}
              />
            ) : null}

            {newView ? (
              <ManageButton
                onClick={newHandler}
                type="primary"
                loading={st_newProductTypeLoading}
              >
                등록
              </ManageButton>
            ) : null}

            <ManageButton onClick={() => setNewView((p) => !p)} type="primary">
              {newView ? "등록취소 (N)" : "신규등록 + (N)"}
            </ManageButton>

            <ManageButton type="primary" onClick={() => graphToggle()}>
              상품유형통계 (S)
            </ManageButton>
          </Wrapper>

          <ManagementTable
            columns={column}
            dataSource={productTypes}
            rowKey={"num"}
          />
        </Wrapper>
      </Wrapper>

      <Drawer
        visible={graphView}
        width="100%"
        title="상품유형 별 판매상품 현황통계 데이터"
        onClose={() => graphToggle()}
      >
        <Wrapper padding="20px">
          {st_getProductType2Loading ? (
            <Spin />
          ) : (
            <Wrapper>
              <BarChart
                configData={productTypes2}
                chartWidth={1125}
                chartHeigh={640}
              />
            </Wrapper>
          )}
        </Wrapper>
      </Drawer>

      {/* Type2 */}

      {productType2Depth ? (
        <Wrapper padding="20px" margin="0px 0px 100px 0px">
          <Wrapper dr="row" ju="space-between">
            <Text fontSize="18px">하위 카테고리</Text>

            <Wrapper dr="row" ju="flex-end">
              {newView2 ? (
                <ManageInput
                  width="220px"
                  placeholder="새로운 유형을 입력하세요."
                  value={newValue2}
                  onChange={(e) => setNewValue2(e.target.value)}
                  onKeyDown={onNewKeyDown2}
                />
              ) : null}

              {newView2 ? (
                <ManageButton onClick={newHandler2} type="primary">
                  등록
                </ManageButton>
              ) : null}

              <ManageButton
                onClick={() => setNewView2((p) => !p)}
                type="primary"
              >
                {newView2 ? "등록취소" : "신규등록"}
              </ManageButton>
            </Wrapper>
          </Wrapper>

          <ManagementTable
            columns={column2}
            dataSource={productType2Depth}
            rowKey={"num"}
          />
        </Wrapper>
      ) : (
        <Text>하위 카테고리를 선택해주세요.</Text>
      )}
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

export default withRouter(ProductType);
