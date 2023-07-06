import React, { useCallback } from "react";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import Theme from "./Theme";
import { Wrapper, Text } from "./commonComponents";
import { ArrowUpOutlined } from "@ant-design/icons";

const Btn = styled(Wrapper)`
  width: 58px;
  height: 58px;
  border-radius: 100%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.09);

  &:hover {
    cursor: pointer;
    background: ${(props) => props.hoverColor};
    border: 1px solid ${Theme.lightGrey2_C};

    & .hoverIcon {
      display: block;
    }
  }

  & .hoverIcon {
    display: none;
  }

  @media (max-width: 900px) {
    width: 40px;
    height: 40px;
  }
`;

const FixedNav = () => {
  ////// HOOKS //////
  const width = useWidth();

  ////// HANDLER //////
  const handleScroll = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper
      width={`auto`}
      position={`fixed`}
      bottom={width < 800 ? `20px` : `20px`}
      right={width < 800 ? `20px` : `50px`}
    >
      <Btn
        bgColor={Theme.black_C}
        color={Theme.white_C}
        hoverColor={Theme.grey2_C}
        onClick={handleScroll}
      >
        <Text fontSize={width < 900 ? `18px` : `24px`}>
          <ArrowUpOutlined />
        </Text>
      </Btn>
    </Wrapper>
  );
};

export default FixedNav;
