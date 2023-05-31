import React, { useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomSelect,
  ProductWrapper,
  RsWrapper,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
  Image,
  CustomPage,
  TextInput,
  ATag,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Select } from "antd";
import styled from "styled-components";
import Link from "next/dist/client/link";

const List = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.grey3_C};
  padding: 20px 0;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [currentTab, setCurrentTab] = useState(0);
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
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
                width={`auto`}
                radius={`17px`}
                border={`1px solid ${Theme.black_C}`}
                padding={`6px 14px`}
                fontSize={`16px`}
                isActive={currentTab === 0}
                onClick={() => setCurrentTab(0)}
              >
                공지사항
              </Wrapper>
            </Wrapper>
            <Wrapper width={`auto`} fontSize={`16px`} color={Theme.grey2_C}>
              FAQ
            </Wrapper>
          </Wrapper>
          <Wrapper width={`75%`}>
            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text fontSize={`26px`} fontWeight={`bold`}>
                공지사항
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px`}>
              <Wrapper width={`auto`} color={Theme.grey_C}>
                000개의 게시글이 존재합니다.
              </Wrapper>
              <Wrapper width={`315px`} position={`relative`}>
                <TextInput
                  type={`text`}
                  width={`315px`}
                  height={`40px`}
                  placeholder={`검색어를 입력해주세요.`}
                  padding={`0 40px 0 20px`}
                />
                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`0`}
                  right={`15px`}
                  height={`100%`}
                >
                  <Image
                    width={`24px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/cs-center/icon_search.png`}
                  />
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderTop={`1px solid ${Theme.black_C}`}
              borderBottom={`1px solid ${Theme.grey3_C}`}
              padding={`20px 0`}
            >
              <Wrapper width={`10%`}>번호</Wrapper>
              <Wrapper width={`60%`}>제목</Wrapper>
              <Wrapper width={`15%`}>조회수</Wrapper>
              <Wrapper width={`15%`}>작성일</Wrapper>
            </Wrapper>
            <Link href={`/customer/1`}>
              <ATag>
                <List>
                  <Wrapper width={`10%`} fontSize={`16px`} color={Theme.grey_C}>
                    10
                  </Wrapper>
                  <Wrapper width={`60%`} fontSize={`16px`} al={`flex-start`}>
                    제목을 입력해주세요.
                  </Wrapper>
                  <Wrapper width={`15%`} fontSize={`16px`}>
                    123
                  </Wrapper>
                  <Wrapper width={`15%`} fontSize={`16px`} color={Theme.grey_C}>
                    2023.05.25
                  </Wrapper>
                </List>
              </ATag>
            </Link>
          </Wrapper>

          <CustomPage />
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

export default Index;
