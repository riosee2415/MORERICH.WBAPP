import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  message,
  Popconfirm,
  Checkbox,
  Image,
  Switch,
  Drawer,
  Spin,
  Select,
  Form,
  Modal,
} from "antd";
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
  CustomSelect,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  ManageButton,
  ManageInput,
  ManagementTable,
  ManageDelButton,
  ManagementForm,
} from "../../../components/managementComponents";
import {
  GET_PRODUCT2_REQUEST,
  GET_PRODUCTTYPE_REQUEST,
  GET_PRODUCT_REQUEST,
  TOGGLE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  UPLOAD_THUMBNAIL_REQUEST,
  INIT_TH,
  SAVE_THUMBNAIL_REQUEST,
  UPLOAD_DETAIL_REQUEST,
  ADD_DETAIL_REQUEST,
  DEL_DETAIL_REQUEST,
  NEW_PRODUCT_REQUEST,
  DEL_PRODUCT_REQUEST,
  ADD_OPTION_REQUEST,
  DEL_OPTION_REQUEST,
} from "../../../reducers/store";
import { numberWithCommas } from "../../../components/commonUtils";
import BarChart from "../../../components/admin/BarChart";

const DelX = styled.div`
  width: 17px;
  height: 17px;
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

const Product = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    productTypes,
    products,
    products2,
    thumbnailPath,
    detailImagePath,
    //
    st_getProduct2Loading,
    st_getProductDone,
    //
    st_toggleProductDone,
    st_toggleProductError,
    //
    st_updateProductDone,
    st_updateProductError,
    //
    st_uploadThumbnailLoading,
    st_uploadDetailImageLoading,
    //
    st_saveThumbnailDone,
    st_saveThumbnailError,
    //
    st_addDetailImageDone,
    st_addDetailImageError,
    //
    st_delDetailImageDone,
    st_delDetailImageError,
    //
    st_newProductDone,
    st_newProductError,
    //
    st_delProductDone,
    st_delProductError,
    //
    st_addOptionDone,
    st_addOptionError,
    st_delOptionDone,
    st_delOptionError,
  } = useSelector((state) => state.store);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상점관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [typeId, setTypeId] = useState(0);
  const [sName, setSName] = useState("");
  const [_sName, _setSName] = useState("");

  const [allCh, setAllCh] = useState(true);
  const [newCh, setNewCh] = useState(false);
  const [bestCh, setBestCh] = useState(false);
  const [recCh, setRecCh] = useState(false);

  const [graphView, setGraphView] = useState(false);
  const [detailDr, setDetailDr] = useState(false);
  const [optionDr, setOptionDr] = useState(false);
  const [crData, setCrData] = useState(null);
  const [cModal, setCModal] = useState(false);

  const [infoForm] = Form.useForm();
  const [optionForm] = Form.useForm();
  const [option2Form] = Form.useForm();

  const thumbnailRef = useRef();
  const detailImageRef = useRef();

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
    if (detailImagePath) {
      for (let i = 0; i < detailImagePath.length; i++) {
        dispatch({
          type: ADD_DETAIL_REQUEST,
          data: {
            filepath: detailImagePath[i].location,
            ProductId: crData.id,
          },
        });
      }
    }
  }, [detailImagePath]);

  useEffect(() => {
    if (st_toggleProductDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });
    }

    if (st_toggleProductError) {
      return message.error("데이터를 수정할 수 없습니다.");
    }
  }, [st_toggleProductDone, st_toggleProductError]);

  useEffect(() => {
    if (st_addOptionDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });

      optionForm.resetFields();
    }
    if (st_addOptionError) {
      return message.error(st_addOptionError);
    }
  }, [st_addOptionDone, st_addOptionError]);

  useEffect(() => {
    if (st_delOptionDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });

      optionForm.resetFields();
    }
    if (st_delOptionError) {
      return message.error(st_delOptionError);
    }
  }, [st_delOptionDone, st_delOptionError]);

  useEffect(() => {
    if (st_delProductDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });

      dtailDrToggle(null);
      setCrData(null);
    }

    if (st_delProductError) {
      return message.error(st_delProductError);
    }
  }, [st_delProductDone, st_delProductError]);

  useEffect(() => {
    if (st_newProductDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });
    }

    if (st_newProductError) {
      return message.error(st_newProductError);
    }
  }, [st_newProductDone, st_newProductError]);

  useEffect(() => {
    if (st_delDetailImageDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });
    }

    if (st_delDetailImageError) {
      return message.error("데이터를 수정할 수 없습니다.");
    }
  }, [st_delDetailImageDone, st_delDetailImageError]);

  useEffect(() => {
    if (st_saveThumbnailDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });

      setCrData({
        ...crData,
        thumbnail: thumbnailPath,
      });
    }

    if (st_saveThumbnailError) {
      return message.error("데이터를 수정할 수 없습니다.");
    }
  }, [st_saveThumbnailDone, st_saveThumbnailError]);

  useEffect(() => {
    if (st_addDetailImageDone && st_getProductDone) {
      if (crData) {
        const targetData = products.find((item) => item.id === crData.id);
        setCrData(targetData);
      }
    }

    if (st_delDetailImageDone && st_getProductDone) {
      if (crData) {
        const targetData = products.find((item) => item.id === crData.id);

        setCrData(targetData);
      }
    }
    if (st_addOptionDone && st_getProductDone) {
      if (crData) {
        const targetData = products.find((item) => item.id === crData.id);

        setCrData(targetData);
      }
    }

    if (st_delOptionDone && st_getProductDone) {
      if (crData) {
        const targetData = products.find((item) => item.id === crData.id);

        setCrData(targetData);
      }
    }
  }, [st_getProductDone]);

  useEffect(() => {
    if (st_addDetailImageDone) {
      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });
    }

    if (st_addDetailImageError) {
      return message.error(st_addDetailImageError);
    }
  }, [st_addDetailImageDone, st_addDetailImageError]);

  useEffect(() => {
    if (st_updateProductDone) {
      message.info("상품정보가 수정되었습니다.");

      dispatch({
        type: GET_PRODUCT_REQUEST,
        data: {
          ProductTypeId: typeId,
          sName: _sName,
          isNew: newCh,
          isBest: bestCh,
          isRecomm: recCh,
        },
      });
    }

    if (st_updateProductError) {
      return message.error(st_updateProductError);
    }
  }, [st_updateProductDone, st_updateProductError]);

  useEffect(() => {
    if (newCh || bestCh || recCh) setAllCh(false);

    if (!newCh && !bestCh && !recCh) setAllCh(true);
  }, [newCh, bestCh, recCh]);

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_REQUEST,
      data: {
        ProductTypeId: typeId,
        sName: _sName,
        isNew: newCh,
        isBest: bestCh,
        isRecomm: recCh,
      },
    });
  }, [typeId, _sName, newCh, bestCh, recCh]);

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

  const saveThHandler = useCallback(() => {
    dispatch({
      type: SAVE_THUMBNAIL_REQUEST,
      data: {
        id: crData.id,
        thumbnailPath: thumbnailPath,
      },
    });
  }, [crData, thumbnailPath]);

  const optionDrToggle = useCallback((item) => {
    setOptionDr((p) => !p);

    if (item) {
      setCrData(item);
    }
  }, []);

  const dtailDrToggle = useCallback((row) => {
    setDetailDr((p) => !p);

    dispatch({
      type: INIT_TH,
    });

    if (row) {
      setCrData(row);

      infoForm.setFieldsValue({
        name: row.name,
        subName: row.subName,
        detail: row.detail,
        price: row.price,
        discount: row.discount,
        infoColor: row.infoColor,
        infoConsist: row.infoConsist,
        infoSize: row.infoSize,
        infoType: row.infoType,
        infoFrom: row.infoFrom,
        viewCreatedAt: row.viewCreatedAt,
        viewUpdatedAt: row.viewUpdatedAt,
      });
    }
  }, []);

  const dataToggleUpdate = useCallback((e, row, type) => {
    const nextFlag = e ? 1 : 0;

    dispatch({
      type: TOGGLE_PRODUCT_REQUEST,
      data: {
        id: row.id,
        nextFlag,
        type,
      },
    });
  }, []);

  const graphToggle = useCallback(() => {
    setGraphView((p) => !p);

    if (!graphView) {
      dispatch({
        type: GET_PRODUCT2_REQUEST,
      });
    }
  }, [graphView]);

  const saveSName = useCallback(() => {
    _setSName(sName);
  }, [sName, _sName]);

  const saveSNameKey = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        saveSName();
      }
    },
    [sName, _sName]
  );

  const initSearch = useCallback(() => {
    setSName("");
    _setSName("");
    setTypeId(0);
    setAllCh(true);
    setBestCh(false);
    setNewCh(false);
    setRecCh(false);
  }, []);

  const detailFinish = useCallback(
    (data) => {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
        data: {
          ProductTypeId: crData.ProductTypeId,
          detail: data.detail,
          discount: data.discount,
          id: crData.id,
          infoColor: data.infoColor,
          infoConsist: data.infoConsist,
          infoFrom: data.infoFrom,
          infoSize: data.infoSize,
          infoType: data.infoType,
          isBest: crData.isBest,
          isNew: crData.isNew,
          isRecomm: crData.isRecomm,
          name: data.name,
          price: data.price,
          subName: data.subName,
        },
      });
    },
    [crData]
  );

  const productTypeChangeHandler = useCallback(
    (e) => {
      setCrData({
        ...crData,
        ProductTypeId: e,
      });
    },
    [crData]
  );

  const detailToggleHandler = useCallback(
    (e, type) => {
      if (type === "new") {
        setCrData({
          ...crData,
          isNew: e.target.checked ? 1 : 0,
        });
      }

      if (type === "best") {
        setCrData({
          ...crData,
          isBest: e.target.checked ? 1 : 0,
        });
      }

      if (type === "recomm") {
        setCrData({
          ...crData,
          isRecomm: e.target.checked ? 1 : 0,
        });
      }
    },
    [crData]
  );

  const detailImageDelete = useCallback((item) => {
    dispatch({
      type: DEL_DETAIL_REQUEST,
      data: {
        id: item.id,
      },
    });
  }, []);

  const createGuideModal = useCallback(() => {
    setCModal((p) => !p);
  }, []);

  const createAction = useCallback(() => {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    createGuideModal();
  }, []);

  const deleteProductHandler = useCallback(() => {
    dispatch({
      type: DEL_PRODUCT_REQUEST,
      data: {
        id: crData.id,
      },
    });
  }, [crData]);

  const optionAddHandler = useCallback(
    (data) => {
      dispatch({
        type: ADD_OPTION_REQUEST,
        data: {
          ProductId: crData.id,
          value: data.value,
        },
      });
    },
    [crData]
  );

  const deleteOptionHandler = useCallback((row) => {
    dispatch({
      type: DEL_OPTION_REQUEST,
      data: {
        id: row.id,
      },
    });
  }, []);

  // FILE HANDLER
  const clickImageUpload = useCallback(() => {
    thumbnailRef.current.click();
  }, [thumbnailRef.current]);

  const clickImageUpload2 = useCallback(() => {
    detailImageRef.current.click();
  }, [detailImageRef.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: UPLOAD_THUMBNAIL_REQUEST,
      data: formData,
    });
  });

  const onChangeImages2 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: UPLOAD_DETAIL_REQUEST,
      data: formData,
    });
  });

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const column = [
    {
      title: "번호",
      dataIndex: "num",
      width: "3%",
    },
    {
      title: "썸네일",
      render: (row) => {
        return row.thumbnail ? (
          <Image
            alt="썸네일"
            src={row.thumbnail}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        ) : (
          <Text color={Theme.red_C}>썸네일 미등록</Text>
        );
      },
    },

    {
      title: "상품명",
      render: (row) => <div>{row.name}</div>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "유형명",
      render: (row) => <div>{row.value}</div>,
      sorter: (a, b) => a.value.localeCompare(b.value),
    },
    {
      title: "판매금액",
      render: (row) => <div>{row.viewPrice}</div>,
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "할인금액",
      render: (row) => <div>{row.viewDiscount}</div>,
      sorter: {
        compare: (a, b) => a.discround - b.discround,
        multiple: 3,
      },
    },
    {
      title: "할인가",
      render: (row) => (
        <Text color={Theme.subTheme3_C}>{row.viewCalcPrice}</Text>
      ),
      sorter: {
        compare: (a, b) => a.discround - b.discround,
        multiple: 3,
      },
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
      title: "신상품",
      render: (row) => (
        <Switch
          checked={row.isNew}
          onChange={(e) => dataToggleUpdate(e, row, "new")}
        />
      ),
      sorter: {
        compare: (a, b) => a.isNew - b.isNew,
        multiple: 3,
      },
    },

    {
      title: "베스트",
      render: (row) => (
        <Switch
          checked={row.isBest}
          onChange={(e) => dataToggleUpdate(e, row, "best")}
        />
      ),
      sorter: {
        compare: (a, b) => a.isBest - b.isBest,
        multiple: 3,
      },
    },

    {
      title: "추천",
      render: (row) => (
        <Switch
          checked={row.isRecomm}
          onChange={(e) => dataToggleUpdate(e, row, "recomm")}
        />
      ),
      sorter: {
        compare: (a, b) => a.isRecomm - b.isRecomm,
        multiple: 3,
      },
    },

    {
      title: "상세정보",
      render: (row) => (
        <ManageButton type="primary" onClick={() => dtailDrToggle(row)}>
          상세정보
        </ManageButton>
      ),
    },
    {
      title: "옵션정보",
      render: (row) => (
        <ManageButton onClick={() => optionDrToggle(row)}>
          상품옵션
        </ManageButton>
      ),
    },
  ];

  const column2 = [
    {
      title: "번호",
      dataIndex: "num",
      width: "10%",
    },

    {
      title: "옵션명",
      render: (row) => <Text color={Theme.subTheme3_C}>{row.value}</Text>,
      sorter: (a, b) => a.value.localeCompare(b.value),
    },
    {
      title: "삭제",
      render: (row) => (
        <Popconfirm
          title="삭제한 옵션은 복구할 수 없습니다. 삭제하시겠습니까?"
          onCancel={null}
          onConfirm={() => deleteOptionHandler(row)}
        >
          <ManageDelButton>옵션삭제</ManageDelButton>
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
                placeholder="상품명으로 검색"
                value={sName}
                onChange={(e) => setSName(e.target.value)}
                onKeyDown={saveSNameKey}
              />
              <ManageButton type="primary" onClick={saveSName}>
                검색
              </ManageButton>
              <ManageButton onClick={initSearch}>검색초기화</ManageButton>
            </Wrapper>

            <Wrapper dr="row" margin="0px 0px 5px 0px" ju="flex-start">
              <Checkbox checked={allCh}>전체</Checkbox>
              <Checkbox
                onChange={(e) => setNewCh(e.target.checked)}
                checked={newCh}
              >
                신상품
              </Checkbox>
              <Checkbox
                onChange={(e) => setBestCh(e.target.checked)}
                checked={bestCh}
              >
                베스트
              </Checkbox>
              <Checkbox
                onChange={(e) => setRecCh(e.target.checked)}
                checked={recCh}
              >
                추천상품
              </Checkbox>
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
                    key={item.id}
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
            <ManageButton type="primary" onClick={createGuideModal}>
              신규상품 +
            </ManageButton>
            <ManageButton type="primary" onClick={() => graphToggle()}>
              상품통계
            </ManageButton>
          </Wrapper>
        </Wrapper>
        <ManagementTable
          columns={column}
          dataSource={products}
          rowKey={"num"}
        />
      </Wrapper>

      <Drawer
        visible={graphView}
        width="100%"
        title="판매상품 현황통계 데이터"
        onClose={() => graphToggle()}
      >
        <Wrapper padding="20px">
          {st_getProduct2Loading ? (
            <Spin />
          ) : (
            <Wrapper>
              <BarChart
                configData={products2}
                chartWidth={1125}
                chartHeigh={640}
              />
            </Wrapper>
          )}
        </Wrapper>
      </Drawer>

      <Drawer
        visible={detailDr}
        width="50%"
        title={`${crData && crData.name} _ 상품 상세정보`}
        onClose={() => dtailDrToggle(null)}
      >
        <ManagementForm
          onFinish={detailFinish}
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          colon={false}
          form={infoForm}
        >
          <ManagementForm.Item
            label="상품명"
            name="name"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="상품부제"
            name="subName"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item label="상품유형" name="value">
            <CustomSelect width="100%" height="24px">
              <Select
                value={crData && crData.ProductTypeId}
                onChange={productTypeChangeHandler}
              >
                {productTypes.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.value}
                    </Select.Option>
                  );
                })}
              </Select>
            </CustomSelect>
          </ManagementForm.Item>

          <ManagementForm.Item
            label="상품상세설명"
            name="detail"
            rules={[{ required: true }]}
          >
            <ManageInput.TextArea rows={5} />
          </ManagementForm.Item>

          <ManagementForm.Item
            tooltip="단위는 원 입니다."
            label="판매금액"
            name="price"
            rules={[{ required: true }]}
          >
            <ManageInput type="number" />
          </ManagementForm.Item>

          <ManagementForm.Item
            rules={[{ required: true }]}
            tooltip="단위는 원 입니다."
            label="할인금액"
            name="discount"
          >
            <ManageInput type="number" />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="색상"
            name="infoColor"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="소재"
            name="infoConsist"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="사이즈"
            name="infoSize"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="분류"
            name="infoType"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item
            label="제조국가"
            name="infoFrom"
            rules={[{ required: true }]}
          >
            <ManageInput />
          </ManagementForm.Item>

          <ManagementForm.Item label="상품등록일" name="viewCreatedAt">
            <ManageInput readOnly />
          </ManagementForm.Item>

          <ManagementForm.Item label="최근수정일" name="viewUpdatedAt">
            <ManageInput readOnly />
          </ManagementForm.Item>

          <ManagementForm.Item label="신상품" name="isNew">
            <Checkbox
              style={{ marginLeft: "5px" }}
              checked={crData && crData.isNew}
              onChange={(e) => detailToggleHandler(e, "new")}
            />
          </ManagementForm.Item>

          <ManagementForm.Item label="베스트상품" name="isBest">
            <Checkbox
              style={{ marginLeft: "5px" }}
              checked={crData && crData.isBest}
              onChange={(e) => detailToggleHandler(e, "best")}
            />
          </ManagementForm.Item>

          <ManagementForm.Item label="추천상품" name="isRecomm">
            <Checkbox
              style={{ marginLeft: "5px" }}
              checked={crData && crData.isRecomm}
              onChange={(e) => detailToggleHandler(e, "recomm")}
            />
          </ManagementForm.Item>

          <Wrapper al="flex-end">
            <ManageButton htmlType="submit" type="primary">
              정보저장
            </ManageButton>
          </Wrapper>
          <Wrapper al="flex-end">
            <Popconfirm
              title="삭제한 상품은 복원할 수 없습니다. 정말 삭제하시겠습니까?"
              onCancel={null}
              onConfirm={deleteProductHandler}
            >
              <ManageDelButton>상품삭제</ManageDelButton>
            </Popconfirm>
          </Wrapper>
        </ManagementForm>

        <Wrapper
          margin="25px 0px"
          height="1px"
          bgColor={Theme.grey3_C}
        ></Wrapper>

        <Wrapper margin={`10px 0px 0px 0px`}>
          <GuideUl>
            <GuideLi>
              썸네일은 1:1비율로 업로드해주세요. 이미지 비율이 상이하면 이미지
              일부가 보이지 않습니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              상품 상세이미지는 순차적으로 보여집니다. 중간에 순서를 변경할 수
              없으니 업로드 시 이미지파일 하나씩 순서대로 업로드해주세요.
            </GuideLi>
            <GuideLi isImpo={true}>
              이미지 파일 용량이 5MB를 넘을 경우, 이미지 업로드가 중단됩니다.
            </GuideLi>
          </GuideUl>
        </Wrapper>

        <Wrapper margin="15px 0px 0px 0px" al="flex-start">
          <Text fontSize="16px">썸네일 이미지</Text>
        </Wrapper>

        <Wrapper padding="10px 0px" ju="flex-start" al="flex-start" dr="row">
          <Wrapper width="310px" al="flex-start">
            {(crData && crData.thumbnail) || thumbnailPath ? (
              <Image
                src={thumbnailPath ? thumbnailPath : crData && crData.thumbnail}
                alt="thumbnail"
                style={{
                  width: "300px",
                  height: "300px",
                  marginBottom: "5px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Wrapper width="300px" height="300px">
                <Text color={Theme.red_C}>
                  등록된 썸네일이 없습니다. <br />
                  썸네일을 등록해주세요.
                </Text>
              </Wrapper>
            )}

            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={thumbnailRef}
              onChange={onChangeImages}
            />
            <ManageButton
              width="300px"
              type="primary"
              onClick={clickImageUpload}
              loading={st_uploadThumbnailLoading}
            >
              썸네일 업로드
            </ManageButton>

            <Wrapper height="3px"></Wrapper>
            {thumbnailPath && (
              <ManageButton
                width="300px"
                type="primary"
                onClick={saveThHandler}
              >
                업로드 된 썸네일 적용하기
              </ManageButton>
            )}
          </Wrapper>

          <Wrapper
            width="calc(100% - 315px)"
            bgColor={Theme.adminLightGrey_C}
            radius="5px"
            padding="2.5px"
            al="flex-start"
          >
            <Wrapper dr="row" ju="space-between">
              <Text fontSize="16px">상품 상세이미지</Text>

              <input
                type="file"
                name="image"
                accept=".png, .jpg"
                multiple={true}
                hidden
                ref={detailImageRef}
                onChange={onChangeImages2}
              />
              <ManageButton
                onClick={clickImageUpload2}
                loading={st_uploadDetailImageLoading}
                type="primary"
              >
                상세이미지 추가
              </ManageButton>
            </Wrapper>

            <Wrapper dr="row" ju="flex-start">
              {crData &&
                crData.connectArray &&
                crData.connectArray.map((item) => {
                  return (
                    <Wrapper
                      key={item.id}
                      width="120px"
                      height="120px"
                      margin="2px"
                      position="relative"
                      border={`1px solid ${Theme.lightGrey_C}`}
                    >
                      <Image
                        style={{
                          width: "120px",
                          height: "120px",
                        }}
                        src={item.filepath}
                      />
                      <Popconfirm
                        title="이미지를 삭제하시겠습니까? 삭제한 이미지는 복구할 수 없습니다."
                        onCancel={null}
                        onConfirm={() => detailImageDelete(item)}
                      >
                        <DelX>X</DelX>
                      </Popconfirm>
                    </Wrapper>
                  );
                })}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Drawer>

      <Modal
        footer={null}
        title="신규상품 생성"
        visible={cModal}
        width="500px"
        onCancel={createGuideModal}
      >
        <div>
          <GuideUl>
            <GuideLi isImpo={true}>
              신규상품 생성 시, 생성된 상품의 "상세정보"를 통해 상품정보를
              입력해야 합니다. 카테고리는 랜덤으로 부여되니 필수적으로 수정이
              필요합니다.
            </GuideLi>
            <GuideLi isImpo={true}>
              상품생성 즉시 판매상품으로 적용되니, 무분별한 상품 등록을
              삼가해주세요.
            </GuideLi>
            <GuideLi>상품을 생성하시려면 생성 버튼을 눌러주세요.</GuideLi>
          </GuideUl>

          <Wrapper dr="row">
            <ManageDelButton onClick={createGuideModal}>취소</ManageDelButton>
            <ManageButton type="primary" onClick={createAction}>
              상품생성
            </ManageButton>
          </Wrapper>
        </div>
      </Modal>

      <Drawer
        visible={optionDr}
        width="35%"
        title={`${crData && crData.name} _ 상품 옵션정보`}
        onClose={() => optionDrToggle(null)}
      >
        <GuideUl>
          <GuideLi>상품옵션은 갯수에 재한없이 추가 가능합니다.</GuideLi>
          <GuideLi isImpo={true}>
            옵션은 옵션명을 기준 이름순 정렬되니, 등록 시 참고해주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            옵션명을 변경할 경우, 배송중인 물품 또는 배송완료 된 물품조회에
            혼선이 있을 수 있어 수정을 금지합니다.
          </GuideLi>
        </GuideUl>

        <Wrapper dr="row" ju="flex-start">
          <ManagementForm
            form={optionForm}
            layout="inline"
            onFinish={optionAddHandler}
          >
            <ManagementForm.Item
              name="value"
              rules={[{ required: true, message: "옵션명은 필수 입니다." }]}
            >
              <ManageInput width="230px" placeholder="옵션명을 입력해주세요." />
            </ManagementForm.Item>

            <ManageButton type="primary" htmlType="submit">
              등록
            </ManageButton>
          </ManagementForm>
        </Wrapper>
        <Wrapper padding="5px">
          <ManagementTable
            columns={column2}
            dataSource={crData ? crData.options : []}
            rowKey={"num"}
          />
        </Wrapper>
      </Drawer>
    </AdminLayout>
  );
};
// https://via.placeholder.com/300x300?text=Upload Thumbnail

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

    context.store.dispatch({
      type: GET_PRODUCT_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Product);
