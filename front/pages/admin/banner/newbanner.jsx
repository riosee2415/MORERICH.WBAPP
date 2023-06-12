import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Table, message, Form, Input, Button, Image } from "antd";
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
import {} from "../../../reducers/banner";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  BANNER_UPDATE_REQUEST,
  BANNER_UPLOAD_REQUEST,
  NEW_BANNER_REQUEST,
  UPLOAD_BANNER_INIT_REQUEST,
} from "../../../reducers/newbanner";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const FlagText = styled.div`
  width: 120px;
  margin: 0px 20px 0px 0px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const MainBanner = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const {
    banners,
    uploadBannerPath,

    st_bannerUploadLoading,
    st_bannerUploadDone,
    st_bannerUploadError,

    st_newBannerUpdateDone,
    st_newBannerUpdateError,
  } = useSelector((state) => state.newbanner);

  const router = useRouter();
  const dispatch = useDispatch();

  const bannerInageRef = useRef();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

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
    if (st_bannerUploadDone) {
      dispatch({
        type: NEW_BANNER_REQUEST,
      });

      message.success("이미지가 수정되었습니다.");
    }

    if (st_bannerUploadError) {
      return message.error(st_bannerUploadError);
    }
  }, [st_bannerUploadDone, st_bannerUploadError]);

  useEffect(() => {
    if (st_newBannerUpdateDone) {
      dispatch({
        type: NEW_BANNER_REQUEST,
      });

      message.success("기본정보가 변경되었습니다.");
    }
  }, [st_newBannerUpdateDone]);

  useEffect(() => {
    if (st_newBannerUpdateError) {
      return message.error(st_newBannerUpdateError);
    }
  }, [st_newBannerUpdateError]);

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

  const clickImageUpload = useCallback(() => {
    bannerInageRef.current.click();
  }, [bannerInageRef.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: BANNER_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const beforeSetDataHandler = useCallback(
    (record) => {
      dispatch({
        type: UPLOAD_BANNER_INIT_REQUEST,
      });

      setCurrentData(record);

      infoForm.setFieldsValue({
        info: record.info,
        url: record.url,
        updator: record.updator,
        updatedAt: record.viewUpdatedAt,
        createdAt: record.viewCreatedAt,
      });
    },
    [currentData, infoForm]
  );

  const updateButtonHandler = useCallback(
    (data) => {
      if (data.info === currentData.info && !uploadBannerPath) {
        return message.warning("변경할 데이터가 없습니다.");
      }

      dispatch({
        type: BANNER_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          info: data.info,
          url: data.url || "",
          imagePath: uploadBannerPath
            ? uploadBannerPath
            : currentData.imagePath,
        },
      });
    },
    [currentData, uploadBannerPath]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
    {
      title: "이미지 명칭",
      dataIndex: "info",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
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
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi>배너 이미지를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            이미지는 화면 디자인 크기에 알맞게 자동으로 조정됩니다. 비율이
            상이할 경우 이미지가 늘어나 보일 수 있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={banners ? banners : []}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <InfoTitle>
                <CheckOutlined />
                베너이미지 제어
              </InfoTitle>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <BannerImage
                  src={
                    uploadBannerPath
                      ? uploadBannerPath
                      : currentData && currentData.imagePath
                  }
                />
              </Wrapper>

              <Wrapper margin={`0px 0px 10px 0px`} al={`flex-end`}>
                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg"
                  // multiple
                  hidden
                  ref={bannerInageRef}
                  onChange={onChangeImages}
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={clickImageUpload}
                  loading={st_bannerUploadLoading}
                >
                  이미지 업로드
                </Button>
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <InfoTitle>
                <CheckOutlined />
                기본정보 제어
              </InfoTitle>
              <Wrapper>
                <Form
                  style={{ width: "100%" }}
                  form={infoForm}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  onFinish={updateButtonHandler}
                >
                  <Form.Item label="이미지명칭" name="info">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="연결링크" name="url">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="최근 작업자" name="updator">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="최근 작업일" name="updatedAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="생성일" name="createdAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Wrapper al="flex-end" margin="0px 0px 20px 0px">
                    <Button type="primary" size="small" htmlType="submit">
                      데이터 수정
                    </Button>
                  </Wrapper>
                </Form>
              </Wrapper>
            </>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
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
      type: NEW_BANNER_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(MainBanner);
