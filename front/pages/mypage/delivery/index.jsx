import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
  CommonButton,
  TextInput,
  SpanText,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { Checkbox, Empty, message, Modal, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDRESS_CREATE_REQUEST,
  ADDRESS_LIST_REQUEST,
} from "../../../reducers/mypage";
import useInput from "../../../hooks/useInput";
import { useRouter } from "next/router";
import DaumPostcode from "react-daum-postcode";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { addressList, st_addressCreateDone, st_addressCreateError } =
    useSelector((state) => state.mypage);

  console.log(addressList);

  const [cModal, setCModal] = useState(false);
  const [pModal, setPModal] = useState(false);
  const [normal, setNormal] = useState(false);

  const title = useInput("");
  const name = useInput("");
  const mobile = useInput("");
  const post = useInput("");
  const adrs = useInput("");
  const dadrs = useInput("");

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);

      return message.error("로그인이 필요한 서비스입니다.");
    }
  }, [me]);

  // ********************** 회원정보 수정 후처리 *************************

  useEffect(() => {
    if (st_addressCreateError) {
      return message.error(st_addressCreateError);
    }
  }, [st_addressCreateError]);

  useEffect(() => {
    if (st_addressCreateDone) {
      title.setValue(``);
      name.setValue(``);
      mobile.setValue(``);
      post.setValue(``);
      adrs.setValue(``);
      dadrs.setValue(``);

      cModalToggle();

      dispatch({
        type: ADDRESS_LIST_REQUEST,
      });

      return message.success("배송지가 추가되었습니다.");
    }
  }, [st_addressCreateDone]);

  ////// TOGGLE //////
  const cModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);

  const pModalToggle = useCallback(() => {
    setPModal((prev) => !prev);
  }, [pModal]);
  ////// HANDLER //////

  // 배송지 추가
  const addressCreateHandler = useCallback(() => {
    if (!title.value) {
      return message.error("명칭을 입력해주세요.");
    }

    if (!name.value) {
      return message.error("이름을 입력해주세요.");
    }
    if (!mobile.value) {
      return message.error("연락처를 입력해주세요.");
    }
    if (!adrs.value) {
      return message.error("주소를 입력해주세요.");
    }
    if (!dadrs.value) {
      return message.error("상세주소를 입력해주세요.");
    }

    dispatch({
      type: ADDRESS_CREATE_REQUEST,
      data: {
        title: title.value,
        name: name.value,
        mobile: mobile.value,
        post: post.value,
        adrs: adrs.value,
        dadrs: dadrs.value,
        isBasic: normal,
      },
    });
  }, [title, name, mobile, adrs, post, dadrs, normal]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | 배송지관리</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`80px 0`}>
          <RsWrapper al={`flex-start`}>
            <Text fontSize={`34px`} fontWeight={`600`} margin={`0 0 22px`}>
              MY PAGE
            </Text>
          </RsWrapper>
          <RsWrapper dr={`row`} position={`relative`} al={`flex-start`}>
            <MypageLeft />
            <Wrapper
              width={width < 1100 ? `100%` : `calc(100% - 266px)`}
              padding={width < 1100 ? `40px 0 0` : `0 0 0 54px`}
            >
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                margin={width < 800 ? `0 0 15px` : `0 0 26px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `34px`}
                  fontWeight={`600`}
                >
                  배송지관리
                </Text>
                <Wrapper width={`auto`} dr={`row`}>
                  <CommonButton
                    width={`100px`}
                    height={`32px`}
                    padding={`0`}
                    kindOf={`white`}
                    margin={`0 6px 0 0`}
                  >
                    삭제하기
                  </CommonButton>
                  <CommonButton
                    width={`100px`}
                    height={`32px`}
                    padding={`0`}
                    onClick={cModalToggle}
                  >
                    추가하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>

              {width < 800 ? (
                <Wrapper borderTop={`1px solid ${Theme.black_C}`}>
                  <Wrapper
                    borderBottom={`1px solid ${Theme.grey3_C}`}
                    padding={`25px 0 20px`}
                    al={`flex-start`}
                  >
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Checkbox />
                      <Wrapper width={`auto`} dr={`row`}>
                        <CommonButton
                          kindOf={`grey3`}
                          width={`45px`}
                          height={`30px`}
                          padding={`0`}
                          margin={`0 6px 0 0`}
                        >
                          삭제
                        </CommonButton>
                        <CommonButton
                          kindOf={`grey`}
                          width={`45px`}
                          height={`30px`}
                          padding={`0`}
                        >
                          수정
                        </CommonButton>
                      </Wrapper>
                    </Wrapper>
                    <Text
                      margin={`12px 0 8px`}
                      fontSize={`16px`}
                      fontWeight={`600`}
                    >
                      판암동마루
                    </Text>
                    <Text margin={`0 0 8px`}>
                      박마루
                      <SpanText margin={`0 0 0 8px`} color={Theme.grey2_C}>
                        010-0000-0000
                      </SpanText>
                    </Text>
                    <Text>대전광역시 동구 뭐시깽이 OO로00-00 0000아파트</Text>
                    <Text margin={`0 0 8px`}>000동 0000호</Text>
                    <Radio>기본주소로 설정</Radio>
                  </Wrapper>
                </Wrapper>
              ) : (
                <>
                  <Wrapper
                    borderTop={`1px solid ${Theme.black_C}`}
                    dr={`row`}
                    fontSize={`16px`}
                    height={`50px`}
                    borderBottom={`1px solid ${Theme.grey3_C}`}
                  >
                    <Wrapper width={`5%`}>
                      <Checkbox />
                    </Wrapper>
                    <Wrapper width={`15%`}>명칭</Wrapper>
                    <Wrapper width={`20%`}>성명/연락처</Wrapper>
                    <Wrapper width={`35%`}>주소</Wrapper>
                    <Wrapper width={`15%`}>기본주소로 설정</Wrapper>
                    <Wrapper width={`10%`}>수정</Wrapper>
                  </Wrapper>

                  {addressList && addressList.length === 0 ? (
                    <Wrapper padding={`30px 0`}>
                      <Empty description="배송지를 추가해주세요." />
                    </Wrapper>
                  ) : (
                    addressList.map((data) => {
                      return (
                        <Wrapper
                          key={data.id}
                          dr={`row`}
                          padding={`20px 0`}
                          borderBottom={`1px solid ${Theme.grey3_C}`}
                        >
                          <Wrapper width={`5%`}>
                            <Checkbox />
                          </Wrapper>
                          <Wrapper
                            fontSize={`16px`}
                            width={`15%`}
                            fontWeight={`600`}
                          >
                            {data.title}
                          </Wrapper>
                          <Wrapper width={`20%`} color={Theme.darkGrey_C}>
                            <Text>{data.name}</Text>
                            <Text>{data.mobile}</Text>
                          </Wrapper>
                          <Wrapper
                            width={`35%`}
                            al={`flex-start`}
                            color={Theme.darkGrey_C}
                          >
                            <Text>{data.adrs}</Text>
                            <Text>{data.dadrs}</Text>
                          </Wrapper>
                          <Wrapper width={`15%`}>
                            <Radio />
                          </Wrapper>
                          <Wrapper width={`10%`}>
                            <CommonButton
                              kindOf={`grey`}
                              width={`45px`}
                              height={`30px`}
                              padding={`0`}
                            >
                              수정
                            </CommonButton>
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                  )}
                </>
              )}
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={cModalToggle} visible={cModal} footer={null}>
            <Wrapper padding={width < 800 ? `30px 0` : `50px`}>
              <Text fontSize={`28px`} fontWeight={`600`} margin={`0 0 30px`}>
                배송지 추가
              </Text>
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 8px`}>명칭</Text>
                <TextInput
                  {...title}
                  placeholder="명칭"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>성명</Text>
                <TextInput
                  {...name}
                  placeholder="성명"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>연락처</Text>
                <TextInput
                  {...mobile}
                  placeholder="'-'를 제외한 연락처"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />
                <Text margin={`0 0 8px`}>주소</Text>
                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 8px`}>
                  <TextInput
                    {...post}
                    placeholder="우편번호"
                    width={`calc(100% - 130px)`}
                    height={`50px`}
                    readOnly
                  />
                  <CommonButton
                    width={`120px`}
                    fontSize={`16px`}
                    fontWeight={`600`}
                    height={`50px`}
                    onClick={pModalToggle}
                  >
                    우편번호
                  </CommonButton>
                </Wrapper>
                <TextInput
                  {...adrs}
                  placeholder="주소"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 8px`}
                  readOnly
                />
                <TextInput
                  {...dadrs}
                  placeholder="상세주소"
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 25px`}
                />

                <Checkbox checked={normal}>기본주소로 설정</Checkbox>
              </Wrapper>

              <CommonButton
                width={`100%`}
                fontSize={`16px`}
                fontWeight={`600`}
                height={`50px`}
                margin={`15px 0 0`}
                onClick={addressCreateHandler}
              >
                추가하기
              </CommonButton>
            </Wrapper>
          </Modal>

          <Modal visible={pModal} footer={null} onCancel={pModalToggle}>
            <DaumPostcode
              onComplete={(data) => {
                adrs.setValue(data.address);
                post.setValue(data.zonecode);
                pModalToggle();
              }}
              width={width < 600 ? `100%` : `600px`}
              height={`500px`}
              autoClose={false}
              animation
            />
          </Modal>
        </WholeWrapper>
      </ClientLayout>
    </>
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
      type: ADDRESS_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
