import React, { useCallback, useEffect } from "react";
import { Text, Image, Wrapper, SpanText, ATag } from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";

const Box = styled(Wrapper)`
  height: 60px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) =>
    props.isActive ? props.theme.black_C : props.theme.lightGrey2_C};
  color: ${(props) =>
    props.isActive ? props.theme.white_C : props.theme.black_C};
  font-weight: ${(props) => (props.isActive ? `600` : ``)};
  font-size: 20px;
  margin: 0 0 10px;

  & svg {
    font-size: 15px;
    opacity: ${(props) => (props.isActive ? `1` : `0`)};
    transition: 0.3s;
  }

  &:hover {
    cursor: pointer;

    & svg {
      opacity: 1;
    }
  }

  @media (max-width: 1100px) {
    width: calc(100% / 4);
    font-size: 18px;
    margin: 0;
  }

  @media (max-width: 800px) {
    width: calc(100% / 2);
    font-size: 16px;
    height: 45px;
  }
`;

const MypageLeft = () => {
  const { me } = useSelector((state) => state.user);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper
      width={width < 1100 ? `100%` : `266px`}
      al={`flex-start`}
      position={width < 1100 ? `relative` : `sticky`}
      top={width < 1100 ? `0` : `120px`}
      left={`0`}
      zIndex={`100`}
    >
      <Text fontSize={width < 800 ? `16px` : `20px`}>
        <SpanText
          fontSize={width < 800 ? `20px` : `28px`}
          fontWeight={`600`}
          margin={`0 5px 0 0`}
        >
          {me && me.userId}
        </SpanText>
        님, 반갑습니다.
      </Text>
      <Text fontSize={width < 800 ? `16px` : `20px`}>
        보유포인트 : {me && me.point}P
      </Text>
      <Wrapper
        borderTop={`1px solid ${Theme.black_C}`}
        margin={width < 800 ? `20px 0 0` : `36px 0 0`}
        padding={width < 800 ? `15px 0 0` : `30px 0 0`}
        dr={width < 1100 ? `row` : `column`}
      >
        <Box
          onClick={() => movelinkHandler(`/mypage/order`)}
          isActive={router.pathname.includes(`/mypage/order`)}
        >
          구매내역 <RightOutlined />
        </Box>

        <Box
          onClick={() => movelinkHandler(`/mypage/wish`)}
          isActive={router.pathname.includes(`/mypage/wish`)}
        >
          위시리스트 <RightOutlined />
        </Box>
        <Box
          onClick={() => movelinkHandler(`/mypage/delivery`)}
          isActive={router.pathname.includes(`/mypage/delivery`)}
        >
          배송지관리 <RightOutlined />
        </Box>
        <Box
          onClick={() => movelinkHandler(`/mypage/userInfo`)}
          isActive={router.pathname.includes(`/mypage/userInfo`)}
        >
          회원정보수정 <RightOutlined />
        </Box>
      </Wrapper>
    </Wrapper>
  );
};

export default MypageLeft;
