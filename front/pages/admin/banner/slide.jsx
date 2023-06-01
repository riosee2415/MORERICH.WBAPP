import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Image, Modal, Popover, message, Form, Drawer, Popconfirm } from "antd";
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
  GET_SLIDE_REQUEST,
  UPDATE_SLIDE_REQUEST,
  INSERT_SLIDE_REQUEST,
  DELETE_SLIDE_REQUEST,
} from "../../../reducers/banner";
import {
  ManageButton,
  ManageInput,
  ManagementForm,
  ManagementTable,
} from "../../../components/managementComponents";
import { GET_PRODUCT_REQUEST } from "../../../reducers/store";

const DelX = styled.div`
  width: 19px;
  height: 19px;
  background-color: ${(props) => props.theme.red_C};
  color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.4s;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.red_C};
    color: ${(props) => props.theme.red_C};
    background-color: #fff;
  }
`;
const Slide = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    slides,
    //
    st_updateSlideBannerDone,
    st_updateSlideBannerError,
    //
    st_insertSlideBannerDone,
    st_insertSlideBannerError,
    //
    st_deleteSlideBannerDone,
    st_deleteSlideBannerError,
  } = useSelector((state) => state.banner);
  const { products } = useSelector((state) => state.store);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [titleModal, setTitleModal] = useState(false);
  const [listDr, setListDr] = useState(false);

  const [crData, setCrData] = useState(null);

  const [titleForm] = Form.useForm();

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
    if (st_updateSlideBannerDone) {
      dispatch({
        type: GET_SLIDE_REQUEST,
      });

      titleModalToggle(null);
      message.info("타이틀이 변경되었습니다.");
    }

    if (st_updateSlideBannerError) {
      return message.error(st_updateSlideBannerError);
    }
  }, [st_updateSlideBannerDone, st_updateSlideBannerError]);

  useEffect(() => {
    if (st_deleteSlideBannerDone) {
      dispatch({
        type: GET_SLIDE_REQUEST,
      });
    }

    if (st_deleteSlideBannerError) {
      return message.error(st_deleteSlideBannerError);
    }
  }, [st_deleteSlideBannerDone, st_deleteSlideBannerError]);

  useEffect(() => {
    if (st_insertSlideBannerDone) {
      dispatch({
        type: GET_SLIDE_REQUEST,
      });
    }

    if (st_insertSlideBannerError) {
      return message.error(st_insertSlideBannerError);
    }
  }, [st_insertSlideBannerDone, st_insertSlideBannerError]);

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

  useEffect(() => {
    if (crData) {
      titleForm.setFieldsValue({
        title: crData.title,
      });
    }
  }, [crData]);

  ////// HANDLER //////

  const addItemHandler = useCallback(
    (row) => {
      dispatch({
        type: INSERT_SLIDE_REQUEST,
        data: {
          MainSlideId: crData.id,
          ProductId: row.id,
        },
      });
    },
    [crData]
  );

  const deleteItenHandler = useCallback((row) => {
    dispatch({
      type: DELETE_SLIDE_REQUEST,
      data: {
        id: row.id,
      },
    });
  }, []);

  const listDrToggle = useCallback((row) => {
    setListDr((p) => !p);

    setCrData(row);
  }, []);

  const titleModalToggle = useCallback((row) => {
    setTitleModal((p) => !p);

    setCrData(row);
  }, []);

  const updateTitleHandler = useCallback(
    (data) => {
      dispatch({
        type: UPDATE_SLIDE_REQUEST,
        data: {
          id: crData.id,
          title: data.title,
        },
      });
    },
    [crData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const column = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "썸네일",
      render: (row) => (
        <Image
          src={row.thumbnail}
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "상품명",
      dataIndex: "name",
    },
    {
      title: "카테고리",
      dataIndex: "value",
    },
    {
      title: "추가",
      render: (row) => (
        <ManageButton type="primary" onClick={() => addItemHandler(row)}>
          추가
        </ManageButton>
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
        {slides.length === 0 ? (
          <div></div>
        ) : (
          slides.map((item) => {
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
                  <ManageButton onClick={() => titleModalToggle(item)}>
                    타이틀 수정
                  </ManageButton>

                  <ManageButton
                    type="primary"
                    onClick={() => listDrToggle(item)}
                  >
                    상품추가
                  </ManageButton>
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
                      <Wrapper
                        key={inItem.name}
                        width="140px"
                        height="160px"
                        margin="3px"
                        position="relative"
                      >
                        <Image
                          src={inItem.thumbnail}
                          width="140px"
                          height="140px"
                          alt="image"
                          style={{ objectFit: "cover" }}
                        />
                        <Wrapper height="18px" margin="2px 0px 0px 0px">
                          {inItem.name.length > 8
                            ? inItem.name.substring(0, 7) + "..."
                            : inItem.name}
                        </Wrapper>

                        <Popconfirm
                          onConfirm={() => deleteItenHandler(inItem)}
                          title="슬라이드에서 제외하시겠습니까?"
                          onCancel={null}
                        >
                          <DelX>X</DelX>
                        </Popconfirm>
                      </Wrapper>
                    );
                  })}

                  {/*  */}
                </Wrapper>
              </Wrapper>
            );
          })
        )}
      </Wrapper>

      <Modal
        visible={titleModal}
        title="슬라이드 타이틀 수정"
        footer={null}
        width="550px"
        onCancel={() => titleModalToggle(null)}
      >
        <ManagementForm
          form={titleForm}
          colon={false}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          onFinish={updateTitleHandler}
        >
          <ManagementForm.Item
            name="title"
            label="타이틀"
            rules={[{ required: true, message: "필수 입력사항 입니다." }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <Wrapper dr="row" ju="flex-end">
            <ManageButton type="primary" htmlType="submit">
              적용
            </ManageButton>
          </Wrapper>
        </ManagementForm>
      </Modal>

      <Drawer
        visible={listDr}
        onClose={() => listDrToggle(null)}
        width="800px"
        title="상품리스트"
      >
        <Wrapper>
          <ManagementTable
            columns={column}
            dataSource={products}
            rowKey={"num"}
          />
        </Wrapper>
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
      type: GET_SLIDE_REQUEST,
    });

    context.store.dispatch({
      type: GET_PRODUCT_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Slide);
