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
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";

const MobileRow = styled(RowWrapper)`
  display: none;

  background: ${Theme.white_C};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: 0.5s;
  padding: 0 20px;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const Menu = styled.h2`
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  position: relative;
  margin: ${(props) => props.margin || `0 44px 0 0`};
  text-decoration: ${(props) => (props.isActive ? `underline` : ``)};

  &:hover {
    cursor: pointer;
    transition: 0.3s;

    text-decoration: underline;
  }

  @media (max-width: 800px) {
    font-size: 16px;
    margin: 0;
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
  const { me } = useSelector((state) => state.user);

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
        height={`120px`}
        display={width < 800 ? `none` : `flex`}
        bgColor={Theme.white_C}
      >
        <RsWrapper dr={`row`} ju={`space-between`}>
          <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
            <ATag href="/" width={`70px`}>
              {logos && logos.find((data) => data.typeOf === "H") && (
                <Image
                  width={`70px`}
                  src={logos.find((data) => data.typeOf === "H").imageURL}
                  alt="logo"
                />
              )}
            </ATag>
            <Wrapper dr={`row`} width={`auto`} margin={`0 0 0 56px`}>
              <Link href={`/new`}>
                <a>
                  <Menu isActive={router.pathname === `/new`}>NEW</Menu>
                </a>
              </Link>
              <Link href={`/best`}>
                <a>
                  <Menu isActive={router.pathname === `/best`}>BEST</Menu>
                </a>
              </Link>
              <Link href={`/product`}>
                <a>
                  <Menu isActive={router.pathname === `/product`}>PRODUCT</Menu>
                </a>
              </Link>

              <Link href={`/customer/notice`}>
                <a>
                  <Menu
                    isActive={router.pathname.includes(`/customer`)}
                    margin={`0`}
                  >
                    고객센터
                  </Menu>
                </a>
              </Link>
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            width={`auto`}
            fontSize={`15px`}
            color={Theme.grey_C}
          >
            {me ? (
              <Link href={`/mypage`}>
                <a>
                  <Text margin={`0 24px 0 0`} isHover>
                    마이페이지
                  </Text>
                </a>
              </Link>
            ) : (
              <Link href={`/user/login`}>
                <a>
                  <Text margin={`0 24px 0 0`} isHover>
                    로그인
                  </Text>
                </a>
              </Link>
            )}

            <Link href={`/cart`}>
              <a>
                <Text margin={`0 5px 0 0`} isHover>
                  카트
                </Text>
              </a>
            </Link>
            <Wrapper
              width={`auto`}
              minWidth={`22px`}
              padding={`2px 4px`}
              radius={`100%`}
              fontSize={`12px`}
              bgColor={Theme.black_C}
              color={Theme.white_C}
            >
              1
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>

      {/* mobile */}
      <MobileRow justify={`center`}>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
          padding={`14px 0`}
        >
          <ATag href="/" width={`45px`}>
            {logos && logos.find((data) => data.typeOf === "F") && (
              <Image
                width={`45px`}
                src={logos.find((data) => data.typeOf === "F").imageURL}
                alt="logo"
              />
            )}
          </ATag>

          <Wrapper width={`auto`} dr={`row`} ju={`flex-end`} fontSize={`20px`}>
            <Link href={`/cart`}>
              <a>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_cart.png`}
                  width={`20px`}
                  margin={`0 20px 0 0`}
                  alt="cart icon"
                />
              </a>
            </Link>
            <MenuOutlined onClick={drawarToggle} />
          </Wrapper>
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`} padding={`20px 0`}>
          <Link href={`/new`}>
            <a>
              <Menu isActive={router.pathname === `/new`}>NEW</Menu>
            </a>
          </Link>
          <Link href={`/best`}>
            <a>
              <Menu isActive={router.pathname === `/best`}>BEST</Menu>
            </a>
          </Link>
          <Link href={`/product`}>
            <a>
              <Menu isActive={router.pathname === `/product`}>PRODUCT</Menu>
            </a>
          </Link>
          <Link href={`/customer/notice`}>
            <a>
              <Menu isActive={router.pathname.includes(`/customer`)}>
                고객센터
              </Menu>
            </a>
          </Link>
        </Wrapper>
        <Drawer
          placement="right"
          onClose={drawarToggle}
          visible={drawar}
          width={`100%`}
          closable={false}
        >
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            borderBottom={`1px solid ${Theme.black_C}`}
            padding={`0 0 14px`}
          >
            <ATag href="/" width={`45px`}>
              {logos && logos.find((data) => data.typeOf === "F") && (
                <Image
                  width={`45px`}
                  src={logos.find((data) => data.typeOf === "F").imageURL}
                  alt="logo"
                />
              )}
            </ATag>
            <Wrapper dr={`row`} width={`auto`}>
              <Link href={me ? `/mypage/order` : `/user/login`}>
                <a>
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_login_m.png`}
                    width={`20px`}
                    margin={`0 30px 0 0`}
                    alt="login icon"
                  />
                </a>
              </Link>

              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_close_m.png`}
                width={`20px`}
                alt="close icon"
                onClick={drawarToggle}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} padding={`55px 0`}>
            <Link href={`/new`}>
              <ATag height={`70px`} ju={`flex-start`}>
                <Menu
                  onClick={drawarToggle}
                  isActive={router.pathname === `/new`}
                >
                  NEW
                </Menu>
              </ATag>
            </Link>
            <Link href={`/best`}>
              <ATag height={`70px`} ju={`flex-start`}>
                <Menu
                  onClick={drawarToggle}
                  isActive={router.pathname === `/best`}
                >
                  BEST
                </Menu>
              </ATag>
            </Link>
            <Link href={`/product`}>
              <ATag height={`70px`} ju={`flex-start`}>
                <Menu
                  onClick={drawarToggle}
                  isActive={router.pathname === `/product`}
                >
                  PRODUCT
                </Menu>
              </ATag>
            </Link>
            <Link href={`/customer/notice`}>
              <ATag height={`70px`} ju={`flex-start`}>
                <Menu
                  onClick={drawarToggle}
                  isActive={router.pathname.includes(`/customer`)}
                >
                  고객센터
                </Menu>
              </ATag>
            </Link>
            <Wrapper
              padding={`28px 20px`}
              bgColor={Theme.lightGrey2_C}
              al={`flex-start`}
              fontSize={`16px`}
              color={Theme.darkGrey_C}
              fontWeight={`600`}
            >
              <Link href={`/customer/notice`}>
                <a>
                  <Text onClick={drawarToggle} margin={`0 0 20px`}>
                    공지사항
                  </Text>
                </a>
              </Link>
              <Link href={`/customer/faq`}>
                <a>
                  <Text onClick={drawarToggle}>FAQ</Text>
                </a>
              </Link>
            </Wrapper>
          </Wrapper>
        </Drawer>
      </MobileRow>
    </>
  );
};

export default AppHeader;
