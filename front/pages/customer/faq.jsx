import React, { useCallback, useEffect, useState } from "react";
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
  CustomPage,
  TextInput,
  ATag,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Empty, Select } from "antd";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";
import { NOTICE_LIST_REQUEST } from "../../reducers/notice";
import useInput from "../../hooks/useInput";
import { FAQ_LIST_REQUEST } from "../../reducers/faq";

const NoticeList = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.grey3_C};
  padding: 20px 0;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }
`;

const ListWrapper = styled(Wrapper)`
  margin: 0 0 16px;

  &:last-child {
    margin: 0;
  }
`;

const List = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${Theme.grey3_C};
  border-bottom: 1px solid ${Theme.grey3_C};
  padding: 26px 30px;

  &:hover {
    cursor: pointer;
    ${Text} {
      color: ${Theme.black_C};
    }
  }
`;

const Notice = () => {
  ////// GLOBAL STATE //////
  const { faqList, page } = useSelector((state) => state.faq);

  const [currentTab, setCurrentTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleId, setVisibleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const searchTitle = useInput("");
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: FAQ_LIST_REQUEST,
      data: {
        page: nextPage,
      },
    });
  }, [nextPage]);

  ////// TOGGLE //////
  const faqToggle = useCallback(
    (data) => {
      if (data.id === visibleId) {
        setIsVisible(false);
        setVisibleId(null);

        return;
      }

      if (data) {
        setVisibleId(data.id);
        setIsVisible(true);
      }
    },
    [isVisible, visibleId]
  );

  ////// HANDLER //////
  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  const nextPageCall = useCallback(
    (changePage) => {
      setNextPage(changePage);
    },
    [nextPage]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | CUSTOMERCENTER</title>
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
                cursor={`pointer`}
                width={`auto`}
                fontSize={`16px`}
                color={Theme.grey2_C}
                isActive={currentTab === 0}
                onClick={() => setCurrentTab(0)}
                margin={`0 26px 0 0`}
              >
                공지사항
              </Wrapper>
              <Wrapper
                width={`auto`}
                radius={`17px`}
                border={`1px solid ${Theme.black_C}`}
                padding={`6px 14px`}
                fontSize={`16px`}
                isActive={currentTab === 1}
                onClick={() => setCurrentTab(1)}
              >
                FAQ
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper width={width < 900 ? `90%` : `75%`}>
            <Wrapper al={`flex-start`} margin={`0 0 30px`}>
              <Text
                fontSize={width < 900 ? `22px` : `26px`}
                fontWeight={`bold`}
              >
                FAQ
              </Text>
            </Wrapper>
          </Wrapper>
          {faqList && faqList.length === 0 ? (
            <Wrapper padding={`50px 0`}>
              <Empty description="조회된 자주 묻는 질문이 없습니다." />
            </Wrapper>
          ) : (
            faqList.map((data) => {
              <ListWrapper key={data.id}>
                <List onClick={() => faqToggle(data)}>
                  <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                    <Text
                      fontSize={width < 900 ? `15px` : `18px`}
                      fontWeight={`600`}
                      color={Theme.black_C}
                    >
                      Q
                    </Text>
                    <Text
                      maxWidth={`calc(100% - 32px - 30px)`}
                      fontSize={width < 900 ? `16px` : `20px`}
                      color={Theme.black_C}
                      margin={`0 12px`}
                    >
                      {data.question}
                    </Text>
                  </Wrapper>
                  {visibleId === data.id && isVisible ? (
                    <Image
                      alt="icon"
                      width={`18px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_top.png`}
                    />
                  ) : (
                    <Image
                      alt="icon"
                      width={`18px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_select-box.png`}
                    />
                  )}
                </List>
                {visibleId === data.id && isVisible && (
                  <Wrapper
                    padding={width < 900 ? `15px` : `24px`}
                    al={`flex-start`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={`16px`}
                    color={Theme.darkGrey_C}
                  >
                    {data.answer}
                  </Wrapper>
                )}
              </ListWrapper>;
            })
          )}

          <CustomPage
            margin={`60px 0 100px`}
            defaultCurrent={1}
            current={parseInt(nextPage)}
            total={page * 10}
            pageSize={10}
            onChange={(page) => nextPageCall(page)}
          />
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
      type: FAQ_LIST_REQUEST,
    });
    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Notice;
