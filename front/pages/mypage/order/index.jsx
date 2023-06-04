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
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BOUGHT_LIST_REQUEST } from "../../../reducers/mypage";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { boughtList } = useSelector((state) => state.mypage);

  console.log(boughtList);

  const [dModal, setDModal] = useState(false);

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
  ////// TOGGLE //////
  const dModalToggle = useCallback(() => {
    setDModal((prev) => !prev);
  }, [dModal]);
  ////// HANDLER //////
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
                  kindOf={`grey2`}
                  fontSize={`15px`}
                >
                  구매내역
                </CommonButton>
                <CommonButton
                  width={`140px`}
                  kindOf={`grey`}
                  fontSize={`15px`}
                  height={`40px`}
                >
                  취소 · 교환 · 환불
                </CommonButton>
              </Wrapper>

              {/* 반복되는 영역 시작 */}
              <Wrapper>
                <Wrapper
                  height={`50px`}
                  borderBottom={`1px solid ${Theme.grey3_C}`}
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  padding={`0 14px`}
                >
                  <Text margin={`0 16px 0 0`}>2023-05-23</Text>
                  <Text color={Theme.grey_C}>ORDER230137192783</Text>
                </Wrapper>
                <Wrapper borderBottom={`1px solid ${Theme.black_C}`} dr={`row`}>
                  <Wrapper
                    width={width < 900 ? `100%` : `58%`}
                    dr={`row`}
                    padding={`23px 14px`}
                  >
                    <Image
                      alt="thumbnail"
                      width={width < 900 ? `80px` : `112px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
                    />
                    <Wrapper
                      width={
                        width < 900 ? `calc(100% - 80px)` : `calc(100% - 112px)`
                      }
                      padding={`0 0 0 14px`}
                      al={`flex-start`}
                    >
                      <Text
                        fontSize={width < 900 ? `16px` : `18px`}
                        fontWeight={`600`}
                      >
                        CASESTUDY
                      </Text>
                      <Text
                        fontSize={width < 900 ? `14px` : `17px`}
                        minHeight={`45px`}
                      >
                        [CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG
                      </Text>
                      <Wrapper width={`auto`} dr={`row`}>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                          margin={`0 15px 0 0`}
                        >
                          옵션 : BLACK
                        </Text>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                        >
                          수량 : 1개
                        </Text>
                      </Wrapper>
                      {width < 900 && (
                        <>
                          <Text>1,100,000원</Text>
                          <Wrapper dr={`row`} margin={`5px 0`}>
                            <Text fontWeight={`600`} margin={`0 10px 0 0`}>
                              배송완료
                            </Text>
                            <Text color={Theme.grey_C}>롯데택배 </Text>
                            <Text color={Theme.grey_C}>12365454654548</Text>
                          </Wrapper>
                          <Wrapper dr={`row`}>
                            <CommonButton
                              width={`32%`}
                              height={`30px`}
                              kindOf={`grey3`}
                              padding={`0`}
                            >
                              교환 요청
                            </CommonButton>
                            <CommonButton
                              width={`32%`}
                              height={`30px`}
                              kindOf={`grey3`}
                              padding={`0`}
                              margin={`0 4px`}
                            >
                              환불 요청
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
                    1,100,000원
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
                      배송완료
                    </Text>
                    <Text color={Theme.grey_C}>롯데택배 </Text>
                    <Text color={Theme.grey_C}>12365454654548</Text>
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
                    >
                      교환 요청
                    </CommonButton>
                    <CommonButton
                      width={`78px`}
                      height={`30px`}
                      kindOf={`grey3`}
                      padding={`0`}
                      margin={`6px 0`}
                    >
                      환불 요청
                    </CommonButton>
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
              {/* 반복되는 영역 끝 */}
              {/* 반복되는 영역 시작 */}
              <Wrapper>
                <Wrapper
                  height={`50px`}
                  borderBottom={`1px solid ${Theme.grey3_C}`}
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`16px`}
                  padding={`0 14px`}
                >
                  <Text margin={`0 16px 0 0`}>2023-05-23</Text>
                  <Text color={Theme.grey_C}>ORDER230137192783</Text>
                </Wrapper>
                <Wrapper borderBottom={`1px solid ${Theme.black_C}`} dr={`row`}>
                  <Wrapper
                    width={width < 900 ? `100%` : `58%`}
                    dr={`row`}
                    padding={`23px 14px`}
                  >
                    <Image
                      alt="thumbnail"
                      width={width < 900 ? `80px` : `112px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png`}
                    />
                    <Wrapper
                      width={
                        width < 900 ? `calc(100% - 80px)` : `calc(100% - 112px)`
                      }
                      padding={`0 0 0 14px`}
                      al={`flex-start`}
                    >
                      <Text
                        fontSize={width < 900 ? `16px` : `18px`}
                        fontWeight={`600`}
                      >
                        CASESTUDY
                      </Text>
                      <Text
                        fontSize={width < 900 ? `14px` : `17px`}
                        minHeight={`45px`}
                      >
                        [CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG
                      </Text>
                      <Wrapper width={`auto`} dr={`row`}>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                          margin={`0 15px 0 0`}
                        >
                          옵션 : BLACK
                        </Text>
                        <Text
                          fontSize={width < 900 ? `14px` : `15px`}
                          color={Theme.grey_C}
                        >
                          수량 : 1개
                        </Text>
                      </Wrapper>
                      {width < 900 && (
                        <>
                          <Text>1,100,000원</Text>
                          <Wrapper dr={`row`} margin={`5px 0`}>
                            <Text fontWeight={`600`} margin={`0 10px 0 0`}>
                              배송완료
                            </Text>
                            <Text color={Theme.grey_C}>롯데택배 </Text>
                            <Text color={Theme.grey_C}>12365454654548</Text>
                          </Wrapper>
                          <Wrapper dr={`row`}>
                            <CommonButton
                              width={`32%`}
                              height={`30px`}
                              kindOf={`grey3`}
                              padding={`0`}
                            >
                              취소 요청
                            </CommonButton>
                            <CommonButton
                              width={`32%`}
                              height={`30px`}
                              kindOf={`grey3`}
                              padding={`0`}
                              margin={`0 4px`}
                              onClick={dModalToggle}
                            >
                              주문 취소
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
                    1,100,000원
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
                      배송완료
                    </Text>
                    <Text color={Theme.grey_C}>롯데택배 </Text>
                    <Text color={Theme.grey_C}>12365454654548</Text>
                  </Wrapper>
                  <Wrapper
                    width={`14%`}
                    display={width < 900 ? `none` : `flex`}
                  >
                    {/* 결제 대기일때 */}
                    <CommonButton
                      width={`78px`}
                      height={`30px`}
                      kindOf={`grey3`}
                      padding={`0`}
                      margin={`0 0 6px`}
                      onClick={dModalToggle}
                    >
                      주문 취소
                    </CommonButton>
                    {/* 결제 완료일때 */}
                    <CommonButton
                      width={`78px`}
                      height={`30px`}
                      kindOf={`grey3`}
                      padding={`0`}
                      margin={`0 0 6px`}
                    >
                      취소 요청
                    </CommonButton>

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
              {/* 반복되는 영역 끝 */}

              <CustomPage margin={`60px 0 0`} />
            </Wrapper>
          </RsWrapper>

          <Modal onCancel={dModalToggle} visible={dModal} footer={null}>
            <Wrapper padding={width < 800 ? `30px 0` : `50px 0`}>
              <Text fontSize={`28px`} fontWeight={`600`}>
                주문취소
              </Text>
              <Text fontSize={`16px`} margin={`30px 0 0`}>
                정말 취소하시겠습니까?
              </Text>
              <Text fontSize={`16px`} margin={`0 0 30px`}>
                주문 취소 후 번복할 수 없습니다.
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
                <CommonButton
                  width={width < 800 ? `130px` : `170px`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  height={`50px`}
                  margin={`0 0 0 4px`}
                >
                  주문취소
                </CommonButton>
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
