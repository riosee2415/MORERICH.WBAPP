import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  Image,
  ATag,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import { AlignRightOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";

const MobileRow = styled(RowWrapper)`
  display: none;

  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  padding: 10px 0;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 600px) {
    display: flex;
  }
`;

const SubMenu = styled(Wrapper)`
  width: 140px;
  position: absolute;
  top: 100px;
  left: 0;
  background: ${(props) => props.theme.white_C};
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  padding: 30px 0;
  opacity: 0;
  visibility: hidden;

  & ${Text} {
    margin-bottom: 16px;
  }

  & ${Text}:last-child {
    margin-bottom: 0;
  }
`;

const Menu = styled.h2`
  height: 100px;
  line-height: 90px;
  font-size: 17px;
  font-weight: 600;
  width: 140px;
  text-align: center;
  position: relative;
  margin: 0;

  &:hover {
    cursor: pointer;
    transition: 0.3s;

    text-decoration: underline;

    & ${SubMenu} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const AppHeader = ({}) => {
  ////////////// - USE STATE- ///////////////
  const router = useRouter();
  const dispatch = useDispatch();
  const width = useWidth();

  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const { logos } = useSelector((state) => state.logo);

  ///////////// - EVENT HANDLER- ////////////

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);
  return (
    <>
      <WholeWrapper
        position={`fixed`}
        top={`0`}
        left={`0`}
        zIndex={`99`}
        bgColor={headerScroll === true && Theme.black_C}
        color={headerScroll === true && Theme.white_C}
      >
        <RsWrapper dr={`row`} ju={`space-between`}>
          <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
            <Wrapper width={`auto`}>
              <ATag href="/" width={`155px`}>
                <Image
                  width={`70px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/logo/logo.svg`}
                  alt="logo"
                />
              </ATag>
            </Wrapper>
            <Wrapper dr={`row`} width={`auto`}>
              <Link href={`/`}>
                <a>
                  <Menu isActive={router.pathname === `/`}>NEW</Menu>
                </a>
              </Link>
              <Link href={`/`}>
                <a>
                  <Menu isActive={router.pathname === `/`}>BEST</Menu>
                </a>
              </Link>
              <Link href={`/`}>
                <a>
                  <Menu isActive={router.pathname === `/`}>PRODUCT</Menu>
                </a>
              </Link>
              <Link href={`/`}>
                <a>
                  <Menu isActive={router.pathname === `/`}>
                    고객센터
                    <SubMenu>
                      <Text
                        fontSize={`16px`}
                        lineHeight={`1`}
                        fontWeight={`bold`}
                        color={Theme.black_C}
                        isHover
                      >
                        <Link href={`/`}>
                          <a>공지사항</a>
                        </Link>
                      </Text>

                      <Text
                        fontSize={`16px`}
                        lineHeight={`1`}
                        fontWeight={`bold`}
                        color={Theme.black_C}
                        isHover
                      >
                        <Link href={`/`}>
                          <a>FAQ</a>
                        </Link>
                      </Text>
                    </SubMenu>
                  </Menu>
                </a>
              </Link>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} width={`auto`}>
            <Link href={`/`}>
              <a>
                <Wrapper fontSize={`15px`} isActive={router.pathname === `/`}>
                  <Text margin={`0 24px 0 0`} isHover>
                    로그인
                  </Text>
                </Wrapper>
              </a>
            </Link>
            <Link href={`/`}>
              <a>
                <Wrapper fontSize={`15px`} isActive={router.pathname === `/`}>
                  <Text margin={`0 24px 0 0`} isHover>
                    마이페이지
                  </Text>
                </Wrapper>
              </a>
            </Link>
            <Link href={`/`}>
              <a>
                <Wrapper
                  isActive={router.pathname === `/`}
                  margin={`0 5px 0 0`}
                >
                  <Text fontSize={`15px`} isHover>
                    카트
                  </Text>
                </Wrapper>
              </a>
            </Link>
            <Wrapper
              width={`16px`}
              height={`16px`}
              radius={`100%`}
              bgColor={Theme.black_C}
              color={Theme.white_C}
            >
              1
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>

      {/* mobile */}
      <MobileRow justify={`center`} className={headerScroll && "background"}>
        <ColWrapper span={11} al={`flex-start`}>
          <ATag href="/" width={`128px`}>
            <Image
              width={`128px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/logo/logo_m.png`}
              alt="logo"
            />
          </ATag>
        </ColWrapper>
        <ColWrapper span={11} al={`flex-end`} fontSize={`2rem`}>
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>

        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          ></Drawer>
        )}
      </MobileRow>
    </>
  );
};

export default AppHeader;
