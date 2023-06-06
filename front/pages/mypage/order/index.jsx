import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
} from "../../../components/commonComponents";
import MypageLeft from "../../../components/MypageLeft";
import Theme from "../../../components/Theme";
import { Empty, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BOUGHT_LIST_REQUEST } from "../../../reducers/mypage";
import { useRouter } from "next/router";
import { numberWithCommas } from "../../../components/commonUtils";
import Link from "next/dist/client/link";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { boughtList } = useSelector((state) => state.mypage);

  const [dModal, setDModal] = useState(false);
  const [drData, setCrData] = useState(null);
  const [sTab, setSTab] = useState(3);

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

  useEffect(() => {
    dispatch({
      type: BOUGHT_LIST_REQUEST,
      data: {
        status: sTab,
      },
    });
  }, [sTab]);
  ////// TOGGLE //////
  const dModalToggle = useCallback(
    (row) => {
      setDModal((prev) => !prev);

      setCrData(row);
    },
    [dModal]
  );
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | Mypage</title>
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
                fontSize={width < 800 ? `20px` : `34px`}
                fontWeight={`600`}
                al={`flex-start`}
                margin={width < 800 ? `0 0 15px` : `0 0 30px`}
              >
                구매내역
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`0 0 20px`}
                borderBottom={`1px solid ${Theme.black_C}`}
              >
                <CommonButton
                  width={`140px`}
                  height={`40px`}
                  margin={`0 8px 0 0`}
                  kindOf={sTab <= 3 ? "grey2" : "grey"}
                  fontSize={`15px`}
                  onClick={() => setSTab(3)}
                >
                  구매내역
                </CommonButton>
                <CommonButton
                  width={`140px`}
                  kindOf={sTab > 3 ? "grey2" : "grey"}
                  fontSize={`15px`}
                  height={`40px`}
                  onClick={() => setSTab(4)}
                >
                  취소 · 교환 · 환불
                </CommonButton>
              </Wrapper>

              {/* 반복되는 영역 시작 */}

              {boughtList && boughtList.length === 0 ? (
                <Wrapper padding={`50px 0`}>
                  <Empty description="조회된 구매내역이 없습니다." />
                </Wrapper>
              ) : (
                boughtList.map((item) => {
                  return (
                    <Wrapper key={item.id}>
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`16px`}
                        padding={`0 14px`}
                      >
                        <Text margin={`0 16px 0 0`}>{item.viewCreatedAt}</Text>
                        <Text color={Theme.grey_C}>
                          {item.sortCreatedAt + "" + item.id}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        borderBottom={`1px solid ${Theme.black_C}`}
                        dr={`row`}
                      >
                        <Wrapper
                          width={width < 900 ? `100%` : `58%`}
                          dr={`row`}
                          padding={`23px 14px`}
                        >
                          <Image
                            alt="thumbnail"
                            width={width < 900 ? `80px` : `112px`}
                            height={width < 900 ? `80px` : `112px`}
                            src={item.connectArray[0].thumbnail}
                          />
                          <Wrapper
                            width={
                              width < 900
                                ? `calc(100% - 80px)`
                                : `calc(100% - 112px)`
                            }
                            padding={`0 0 0 14px`}
                            al={`flex-start`}
                          >
                            <Text
                              fontSize={width < 900 ? `16px` : `18px`}
                              fontWeight={`600`}
                            >
                              {item.connectArray.length < 2 ? (
                                item.connectArray[0].productName
                              ) : (
                                <>
                                  {item.connectArray[0].productName} 외 &nbsp;
                                  {item.connectArray.length}개
                                </>
                              )}
                            </Text>

                            <Wrapper width={`auto`} dr={`row`}>
                              <Text
                                fontSize={width < 900 ? `14px` : `15px`}
                                color={Theme.grey_C}
                              >
                                수량 : {item.connectArray.length}개
                              </Text>
                            </Wrapper>
                            {width < 900 && (
                              <>
                                <Text>
                                  {numberWithCommas(
                                    item.connectArray.reduce(
                                      (sum, currValue) => {
                                        return sum + currValue.price + 2500;
                                      },
                                      0
                                    )
                                  )}
                                  원
                                </Text>
                                <Wrapper
                                  dr={`row`}
                                  margin={`5px 0`}
                                  ju={`flex-start`}
                                >
                                  <Text
                                    fontWeight={`600`}
                                    margin={`0 10px 0 0`}
                                  >
                                    {item.status === 0 && "상품 준비중"}
                                    {item.status === 1 && "배송 준비중"}
                                    {item.status === 2 && "배송중"}
                                    {item.status === 3 && "배송완료"}
                                    {item.status === 4 && "취소/환불"}
                                  </Text>
                                  <Text color={Theme.grey_C}>
                                    {item.deliveryCompany === "-"
                                      ? "배송정보가"
                                      : item.deliveryCompany}{" "}
                                    {item.deliveryNo === "-"
                                      ? "입력되지 않았습니다"
                                      : item.deliveryNo}
                                  </Text>
                                </Wrapper>
                                <Wrapper dr={`row`}>
                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                    onClick={() =>
                                      movelinkHandler(
                                        `/mypage/order/${item.id}`
                                      )
                                    }
                                  >
                                    주문리스트
                                  </CommonButton>

                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                    margin={`0 4px`}
                                    onClick={() => dModalToggle(item)}
                                  >
                                    {item.status <= 2 ? "취소요청" : "환불요청"}
                                  </CommonButton>
                                  <CommonButton
                                    width={`32%`}
                                    height={`30px`}
                                    kindOf={`grey3`}
                                    padding={`0`}
                                  >
                                    1:1 채팅
                                  </CommonButton>
                                </Wrapper>
                              </>
                            )}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                          fontSize={`18px`}
                          fontWeight={`600`}
                        >
                          {numberWithCommas(
                            item.connectArray.reduce((sum, currValue) => {
                              return sum + currValue.price + 2500;
                            }, 0)
                          )}
                          원
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                        >
                          <Text
                            fontSize={`18px`}
                            fontWeight={`600`}
                            margin={`0 0 14px`}
                          >
                            {item.status === 0 && "상품 준비중"}
                            {item.status === 1 && "배송 준비중"}
                            {item.status === 2 && "배송중"}
                            {item.status === 3 && "배송완료"}
                            {item.status === 4 && "취소/환불"}
                          </Text>
                          <Text color={Theme.grey_C}>
                            {item.deliveryCompany === "-"
                              ? "배송정보가"
                              : item.deliveryCompany}
                          </Text>
                          <Text color={Theme.grey_C}>
                            {item.deliveryNo === "-"
                              ? "입력되지 않았습니다"
                              : item.deliveryNo}
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={`14%`}
                          display={width < 900 ? `none` : `flex`}
                        >
                          <CommonButton
                            width={`78px`}
                            height={`30px`}
                            kindOf={`grey3`}
                            padding={`0`}
                            margin={`0 0 3px`}
                            onClick={() =>
                              movelinkHandler(`/mypage/order/${item.id}`)
                            }
                          >
                            주문리스트
                          </CommonButton>
                          {item.status < 3 && (
                            <CommonButton
                              width={`78px`}
                              height={`30px`}
                              kindOf={`grey3`}
                              padding={`0`}
                              margin={`0 0 3px`}
                              onClick={() => dModalToggle(item)}
                            >
                              {item.status <= 2 ? "취소요청" : "환불요청"}
                            </CommonButton>
                          )}

                          <CommonButton
                            width={`78px`}
                            height={`30px`}
                            kindOf={`grey3`}
                            padding={`0`}
                          >
                            1:1 채팅
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  );
                })
              )}

              {/* 반복되는 영역 끝 */}
            </Wrapper>
          </RsWrapper>

          <Modal
            onCancel={() => dModalToggle(null)}
            visible={dModal}
            footer={null}
          >
            <Wrapper padding={width < 800 ? `30px 0` : `50px 0`}>
              <Text fontSize={`28px`} fontWeight={`600`}>
                {drData && drData.status <= 2 ? "주문취소" : "환불요청"}
              </Text>
              <Text fontSize={`16px`} margin={`30px 0 0`}>
                {drData && drData.status <= 2
                  ? "정말 취소하시겠습니까?"
                  : "환불요청 하시겠습니까?"}
              </Text>
              <Text fontSize={`16px`} margin={`0 0 30px`}>
                주문 취소/환불 후 번복할 수 없습니다.
              </Text>
              <Wrapper dr={`row`}>
                <CommonButton
                  width={width < 800 ? `130px` : `170px`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  kindOf={`white`}
                  margin={`0 4px 0 0`}
                  onClick={dModalToggle}
                >
                  이전으로
                </CommonButton>
                <Link href={`/mypage/cancel/${drData && drData.id}`}>
                  <a>
                    <CommonButton
                      width={width < 800 ? `130px` : `170px`}
                      fontSize={`16px`}
                      fontWeight={`600`}
                      height={`50px`}
                      margin={`0 0 0 4px`}
                    >
                      {drData && drData.status <= 2 ? "주문취소" : "환불요청"}
                    </CommonButton>
                  </a>
                </Link>
              </Wrapper>
            </Wrapper>
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
      type: BOUGHT_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
