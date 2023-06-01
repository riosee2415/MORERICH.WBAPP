import React, { useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  TextInput,
  ATag,
  CommonButton,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { NOTICE_DETAIL_REQUEST } from "../../reducers/notice";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  ////// GLOBAL STATE //////
  const { noticeDetail } = useSelector((state) => state.notice);

  const [currentTab, setCurrentTab] = useState(0);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router) {
      dispatch({
        type: NOTICE_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router]);
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | NOTICE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            padding={`48px 0 70px 0`}
            bgColor={Theme.lightGrey2_C}
            margin={`0 0 50px`}
          >
            <Text fontSize={`34px`} fontWeight={`bold`}>
              고객센터
            </Text>
            <Wrapper dr={`row`}>
              <Wrapper
                width={`auto`}
                radius={`17px`}
                border={`1px solid ${Theme.black_C}`}
                padding={`6px 14px`}
                fontSize={`16px`}
                isActive={currentTab === 0}
                onClick={() => setCurrentTab(0)}
                margin={`0 26px 0 0`}
              >
                공지사항
              </Wrapper>
              <Wrapper
                cursor={`pointer`}
                width={`auto`}
                fontSize={`16px`}
                color={Theme.grey2_C}
                isActive={currentTab === 1}
                onClick={() => setCurrentTab(1)}
              >
                FAQ
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper width={width < 900 ? `90%` : `75%`} margin={`0 0 100px`}>
            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text
                fontSize={width < 900 ? `22px` : `26px`}
                fontWeight={`bold`}
              >
                공지사항
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderTop={`1px solid ${Theme.black_C}`}
              padding={width < 900 ? `20px 14px` : `30px 24PX`}
              fontSize={width < 900 ? `15px` : `19px`}
            >
              {noticeDetail && noticeDetail.title}
            </Wrapper>
            <Wrapper
              padding={`11px 24px`}
              bgColor={Theme.lightGrey2_C}
              margin={`0 0 30px`}
            >
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `13px` : `14px`}
                  color={Theme.grey_C}
                  margin={`0 10px 0 0`}
                >
                  작성일
                </Text>
                <Text
                  fontSize={width < 900 ? `13px` : `14px`}
                  margin={`0 55px 0 0`}
                >
                  {noticeDetail && noticeDetail.viewCreatedAt}
                </Text>
                <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                  조회수
                </Text>
                <Text> {noticeDetail && noticeDetail.hit}</Text>
              </Wrapper>
            </Wrapper>
            <Wrapper
              al={`flex-start`}
              padding={`0 0 0 24px`}
              fontSize={`16px`}
              margin={`0 0 70px`}
            >
              <Text
                fontSize={width < 900 ? `13px` : `14px`}
                margin={`0 0 42px`}
              >
                {noticeDetail && noticeDetail.content}
              </Text>
              <Image
                width={`60%`}
                alt="notice"
                src={noticeDetail && noticeDetail.imagePath}
              />
            </Wrapper>
            <Wrapper borderTop={`1px solid ${Theme.grey3_C}`}>
              <Link href={`/customer/notice`}>
                <ATag>
                  <CommonButton
                    width={`210px`}
                    height={`54px`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    margin={`40px 0 0`}
                  >
                    목록
                  </CommonButton>
                </ATag>
              </Link>
            </Wrapper>
          </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Detail;
