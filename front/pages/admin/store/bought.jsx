import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, message, Modal, Form, Drawer, Image, Popconfirm } from "antd";
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
import {
  GET_BOUGHTLIST_REQUEST,
  STATUS_BOUGHTLIST_REQUEST,
  DELI_BOUGHTLIST_REQUEST,
  CANCEL_BOUGHT_REQUEST,
} from "../../../reducers/store";
import { numberWithCommas } from "../../../components/commonUtils";

const Bought = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    boughtlist,
    //
    st_statusBoughtListDone,
    st_statusBoughtListError,
    //
    st_deliBoughtListDone,
    st_deliBoughtListError,
    //
    st_cancelBoughtDone,
    st_cancelBoughtError,
  } = useSelector((state) => state.store);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상점관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [searchId, setSearchId] = useState("");
  const [_searchId, set_SearchId] = useState("");
  const [stat, setStat] = useState(0);

  const [deliModal, setDeliModal] = useState(false);
  const [canModal, setCanModal] = useState(false);
  const [canInfoModal, setCanInfoModal] = useState(false);
  const [detailDr, setDetailDr] = useState(false);
  const [adrs, setAdrs] = useState(false);

  const [crData, setCrData] = useState(null);

  const [deliForm] = Form.useForm();
  const [canForm] = Form.useForm();

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
    if (st_statusBoughtListDone) {
      dispatch({
        type: GET_BOUGHTLIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchId: _searchId,
          stat: stat,
        },
      });
    }

    if (st_statusBoughtListError) {
      return message.error(st_statusBoughtListError);
    }
  }, [st_statusBoughtListDone, st_statusBoughtListError]);

  useEffect(() => {
    if (st_cancelBoughtDone) {
      dispatch({
        type: GET_BOUGHTLIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchId: _searchId,
          stat: stat,
        },
      });

      canModalToggle(null);
      setCrData(null);
    }

    if (st_cancelBoughtError) {
      return message.error(st_cancelBoughtError);
    }
  }, [st_cancelBoughtDone, st_cancelBoughtError]);

  useEffect(() => {
    if (st_deliBoughtListDone) {
      dispatch({
        type: GET_BOUGHTLIST_REQUEST,
        data: {
          searchDate: searchDate,
          searchId: _searchId,
          stat: stat,
        },
      });

      deliModalToggle();
      deliForm.resetFields();
    }

    if (st_deliBoughtListError) {
      return message.error(st_deliBoughtListError);
    }
  }, [st_deliBoughtListDone, st_deliBoughtListError]);

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

  useEffect(() => {
    dispatch({
      type: GET_BOUGHTLIST_REQUEST,
      data: {
        searchDate: searchDate,
        searchId: _searchId,
        stat: stat,
      },
    });
  }, [searchDate, _searchId, stat]);

  ////// HANDLER //////

  const cancelHandler = useCallback(
    (data) => {
      dispatch({
        type: CANCEL_BOUGHT_REQUEST,
        data: {
          id: crData.id,
          reason: data.reason,
        },
      });
    },
    [crData]
  );

  const canModalToggle = useCallback((row) => {
    setCanModal((p) => !p);

    setCrData(row);
  }, []);

  const canInfoModalToggle = useCallback((row) => {
    setCanInfoModal((p) => !p);

    setCrData(row);
  }, []);

  const adrsModalToggle = useCallback((row) => {
    setAdrs((p) => !p);

    setCrData(row);
  }, []);

  const deliModalToggle = useCallback((row) => {
    setDeliModal((p) => !p);

    setCrData(row);
  }, []);

  const detailDrToggle = useCallback((row) => {
    setDetailDr((p) => !p);

    setCrData(row);
  }, []);

  const saveSearchId = useCallback(() => {
    set_SearchId(searchId);
  }, [searchId]);

  const dateChangeHandler = useCallback((e) => {
    setSearchDate(e.target.value);
  }, []);

  const searchEnter = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        saveSearchId();
      }
    },
    [searchId]
  );

  const changeStatusHandler = useCallback((id, stat) => {
    dispatch({
      type: STATUS_BOUGHTLIST_REQUEST,
      data: {
        id,
        stat,
      },
    });
  }, []);

  const deliFinish = useCallback(
    ({ deliveryCompany, deliveryNo }) => {
      dispatch({
        type: DELI_BOUGHTLIST_REQUEST,
        data: {
          id: crData.id,
          deliveryCompany,
          deliveryNo,
        },
      });
    },
    [crData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const column2 = [
    {
      title: "주문번호",
      dataIndex: "id",
      width: "10%",
    },

    {
      title: "썸네일",
      render: (row) => (
        <Image
          src={row.thumbnail}
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "선택옵션",
      dataIndex: "optionValue",
    },
    {
      title: "선택옵션2",
      dataIndex: "etcOption",
    },
    {
      title: "구매수량",
      render: (row) => <Text>{row.qun}개</Text>,
    },
    {
      title: "금액",
      render: (row) => <Text>{numberWithCommas(row.price * row.qun)}원</Text>,
    },
  ];

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
      title: "연락처",
      dataIndex: "mobile",
    },

    {
      title: "구매일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "구매금액",
      render: (row) => (
        <Text>
          {numberWithCommas(
            row.connectArray.reduce((sum, currValue) => {
              let a = sum + currValue.price;

              return a * currValue.qun;
            }, 0)
          )}
          원
        </Text>
      ),
    },

    {
      title: "구매상품 수",
      render: (row) => <div>{row.connectArray.length}개</div>,
    },

    {
      title: "처리상태",
      render: (row) => {
        if (row.status === 0) {
          return <Text color={Theme.red_C}>상품 준비중</Text>;
        }

        if (row.status === 1) {
          return <Text color={Theme.subTheme2_C}>배송 준비중</Text>;
        }

        if (row.status === 2) {
          return <Text color={Theme.subTheme3_C}>배송중</Text>;
        }

        if (row.status === 3) {
          return <Text color={Theme.naver_C}>배송완료</Text>;
        }

        if (row.status === 4) {
          return <Text color={Theme.red_C}>취소/환불</Text>;
        }
      },
    },

    {
      title: "상태변경",
      render: (row) => {
        if (row.status === 0) {
          return (
            <ManageButton
              type="dashed"
              onClick={() => changeStatusHandler(row.id, 1)}
            >{`-> 배송 준비중`}</ManageButton>
          );
        }

        if (row.status === 1) {
          return (
            <Wrapper>
              <ManageButton
                type="dashed"
                onClick={() => changeStatusHandler(row.id, 0)}
              >{`<- 상품 준비중`}</ManageButton>
              <ManageButton
                type="dashed"
                onClick={() => changeStatusHandler(row.id, 2)}
              >{`-> 배송중`}</ManageButton>
            </Wrapper>
          );
        }

        if (row.status === 2) {
          return (
            <Wrapper>
              <ManageButton
                type="dashed"
                onClick={() => changeStatusHandler(row.id, 1)}
              >{`<- 배송 준비중`}</ManageButton>
              <ManageButton
                type="dashed"
                onClick={() => changeStatusHandler(row.id, 3)}
              >{`-> 배송완료`}</ManageButton>
            </Wrapper>
          );
        }

        if (row.status === 3) {
          return (
            <ManageButton
              type="dashed"
              onClick={() => changeStatusHandler(row.id, 2)}
            >{`<- 배송중`}</ManageButton>
          );
        }
      },
    },

    {
      title: "배송회사",
      dataIndex: "deliveryCompany",
    },

    {
      title: "송장번호",
      dataIndex: "deliveryNo",
    },

    {
      title: "정보입력",
      render: (row) => {
        if (row.status > 1) {
          return <Text>정보입력불가</Text>;
        } else {
          return (
            <ManageButton onClick={() => deliModalToggle(row)} type="primary">
              배송정보 입력
            </ManageButton>
          );
        }
      },
    },

    {
      title: "최근수정일",
      dataIndex: "viewUpdatedAt",
    },

    {
      title: "구매상품 상세",
      render: (row) => (
        <ManageButton onClick={() => detailDrToggle(row)} type="primary">
          상세보기
        </ManageButton>
      ),
    },

    {
      title: "회원배송지",
      render: (row) => (
        <ManageButton onClick={() => adrsModalToggle(row)} type="link">
          배송지보기
        </ManageButton>
      ),
    },

    {
      title: "취소/환불",
      render: (row) => {
        if (row.status === 4) {
          return (
            <ManageDelButton onClick={() => canInfoModalToggle(row)}>
              사유확인
            </ManageDelButton>
          );
        } else {
          return (
            <Popconfirm
              title="취소/환불 처리 하시겠습니까?"
              onCancel={null}
              onConfirm={() => canModalToggle(row)}
            >
              <ManageDelButton>취소/환불</ManageDelButton>
            </Popconfirm>
          );
        }
      },
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
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={searchEnter}
              />
              <ManageInput
                width="220px"
                placeholder="날짜"
                value={searchDate}
                type="date"
                onChange={dateChangeHandler}
              />
              <ManageButton type="primary" onClick={saveSearchId}>
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

      <Modal
        visible={deliModal}
        width="650px"
        title="배송정보 입력"
        footer={null}
        onCancel={() => deliModalToggle(null)}
      >
        <GuideUl>
          <GuideLi>배송지정보는 구매자에게 제공되는 데이터 입니다.</GuideLi>
          <GuideLi isImpo={true}>
            기존 배송정보와 상관없이 새로운 정보를 덮어씌우게 됩니다. 정확한
            데이터를 입력해주세요.
          </GuideLi>
        </GuideUl>

        <ManagementForm
          form={deliForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          colon={false}
          onFinish={deliFinish}
        >
          <ManagementForm.Item
            name="deliveryCompany"
            label="배송회사"
            rules={[{ required: true, message: "필수입니다." }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            name="deliveryNo"
            label="송장번호"
            rules={[{ required: true, message: "필수입니다." }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <Wrapper dr="row" ju="flex-end">
            <ManageButton htmlType="submit" type="primary">
              저장
            </ManageButton>
          </Wrapper>
        </ManagementForm>
      </Modal>

      <Drawer
        visible={detailDr}
        width="50%"
        title={`${crData && crData.num}번의 구매 상세목록`}
        onClose={() => detailDrToggle(null)}
      >
        <ManagementTable
          columns={column2}
          dataSource={crData ? crData.connectArray : []}
          rowKey={"id"}
        />
      </Drawer>

      <Modal
        visible={adrs}
        width="500px"
        title="주문배송지"
        footer={null}
        onCancel={() => adrsModalToggle(null)}
      >
        <Wrapper
          bgColor={Theme.adminLightGrey_C}
          padding="10px"
          radius="5px"
          al="flex-start"
        >
          {crData && `(${crData.post}) ${crData.adrs} ${crData.dadrs}`}
        </Wrapper>
      </Modal>

      <Modal
        title="취소/환불 처리하기"
        footer={null}
        width="650px"
        visible={canModal}
        onCancel={() => canModalToggle(null)}
      >
        <ManagementForm
          form={canForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          colon={false}
          onFinish={cancelHandler}
        >
          <ManagementForm.Item
            label="취소/환불 사유"
            name="reason"
            rules={[{ required: true, message: "필수입력사항 입니다." }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <Wrapper dr="row" ju="flex-end">
            <ManageDelButton htmlType="submit">취소/환불 등록</ManageDelButton>
          </Wrapper>
        </ManagementForm>
      </Modal>

      <Modal
        visible={canInfoModal}
        width="500px"
        title="취소/환불 사유 확인하기"
        footer={null}
        onCancel={() => canInfoModalToggle(null)}
      >
        <Wrapper
          bgColor={Theme.adminLightGrey_C}
          padding="10px"
          radius="5px"
          al="flex-start"
        >
          {crData && crData.reason}

          <Wrapper margin="10px" al="flex-start">
            <Text fontSize="18px">계좌정보</Text>
            <Text> 은 행 명 : {crData && crData.returnAccountName}</Text>
            <Text> 예 금 주 : {crData && crData.returnBankName}</Text>
            <Text> 계좌번호 : {crData && crData.returnAccountNum}</Text>
          </Wrapper>
        </Wrapper>
      </Modal>
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
      data: {
        searchDate: new Date().toISOString().substring(0, 10),
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Bought);
