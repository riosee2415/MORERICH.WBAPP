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
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";
import { CART_LIST_REQUEST } from "../reducers/cart";
import { GET_PRODUCTTYPE_REQUEST } from "../reducers/store";

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

const SubMenu = styled(Wrapper)`
  position: absolute;
  top: 120px;
  left: 0;
  background: ${(props) => props.theme.white_C};
  padding: 10px;

  opacity: 0;
  visibility: hidden;
`;

const Menu = styled.h2`
  font-size: 17px;
  font-weight: 600;
  position: relative;
  width: ${(props) => props.width || `80px`};
  line-height: 120px;
  height: 120px;
  margin: 0;
  text-align: center;
  text-decoration: ${(props) => (props.isActive ? `underline` : ``)};

  &:hover {
    cursor: pointer;
    transition: 0.3s;

    text-decoration: underline;

    ${SubMenu} {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 800px) {
    font-size: 16px;
    margin: ${(props) => props.margin || `0`};
    line-height: 1;
    height: auto;
    width: 100%;
    text-align: ${(props) => props.textAlign || `left`};
  }
`;

const AppHeader = ({}) => {
  const { cartList } = useSelector((state) => state.cart);
  const { productTypes } = useSelector((state) => state.store);
  const { logos } = useSelector((state) => state.logo);
  const { me } = useSelector((state) => state.user);
  ////////////// - USE STATE- ///////////////
  const router = useRouter();
  const dispatch = useDispatch();
  const width = useWidth();

  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);

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

  const moveProduct = useCallback((target) => {
    router.push(`/product?target=${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    if (me) {
      dispatch({
        type: CART_LIST_REQUEST,
      });
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
    dispatch({
      type: GET_PRODUCTTYPE_REQUEST,
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
              <Menu
                width={`120px`}
                isActive={router.pathname.includes(`/product`)}
              >
                <Link href={`/product?target=0`}>
                  <a>PRODUCT</a>
                </Link>
                <SubMenu>
                  {productTypes && productTypes.length === 0 ? (
                    <Wrapper fontSize={`16px`} color={Theme.grey_C}>
                      조회된 카테고리가 없습니다.
                    </Wrapper>
                  ) : (
                    productTypes.map((data) => {
                      if (data.isHide === 0) {
                        return (
                          <Text
                            isHover
                            lineHeight={`30px`}
                            fontSize={`16px`}
                            fontWeight={`500`}
                            onClick={() => moveProduct(data.id)}
                            key={data.id}
                          >
                            {data.value}
                          </Text>
                        );
                      }
                    })
                  )}
                </SubMenu>
              </Menu>

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
              <Link href={`/mypage/order`}>
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

            <Link href={`/search`}>
              <a>
                <Text margin={`0 24px 0 0`} isHover>
                  검색
                </Text>
              </a>
            </Link>
            <Link href={`/cart`}>
              <a>
                <Text margin={`0 5px 0 0`} isHover>
                  카트
                </Text>
              </a>
            </Link>
            {me && (
              <Wrapper
                width={`auto`}
                minWidth={`22px`}
                padding={`2px 4px`}
                radius={`100%`}
                fontSize={`12px`}
                bgColor={Theme.black_C}
                color={Theme.white_C}
              >
                {cartList.length}
              </Wrapper>
            )}
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
                  src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_cart.png`}
                  width={`20px`}
                  margin={`0 20px 0 0`}
                  alt="cart icon"
                />
              </a>
            </Link>
            <Link href={`/search`}>
              <a>
                <Wrapper width={`20px`} fontSize={`20px`} margin={`0 20px 0 0`}>
                  <SearchOutlined />
                </Wrapper>
              </a>
            </Link>
            <MenuOutlined onClick={drawarToggle} />
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`20px 0`} dr={`row`} ju={`space-between`}>
          {/* <Wrapper
            minWidth={`${productTypes.length * 60}px`}
            width={`auto`}
            wrap={`nowrap`}
            dr={`row`}
            ju={`flex-start`}
          >
            {productTypes.map((data) => {
              return (
                <Menu
                  width={`auto !important`}
                  margin={`0 10px 0 0`}
                  isActive={router.query.target === String(data.id)}
                  onClick={() => moveProduct(data.id)}
                >
                  {data.value}
                </Menu>
              );
            })}
          </Wrapper> */}
          <Link href={`/new`}>
            <ATag width={`auto`}>
              <Menu textAlign={`center`} isActive={router.pathname === `/new`}>
                NEW
              </Menu>
            </ATag>
          </Link>
          <Link href={`/best`}>
            <ATag width={`auto`}>
              <Menu textAlign={`center`} isActive={router.pathname === `/best`}>
                BEST
              </Menu>
            </ATag>
          </Link>
          <Link href={`/product?target=0`}>
            <ATag width={`auto`}>
              <Menu
                textAlign={`center`}
                isActive={router.pathname.includes(`/product`)}
              >
                PRODUCT
              </Menu>
            </ATag>
          </Link>
          <Link href={`/customer/notice`}>
            <ATag width={`auto`}>
              <Menu
                textAlign={`center`}
                isActive={router.pathname.includes(`/customer`)}
              >
                고객센터
              </Menu>
            </ATag>
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
                    src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_login_m.png`}
                    width={`20px`}
                    margin={`0 30px 0 0`}
                    alt="login icon"
                  />
                </a>
              </Link>
              <Link href={`/search`}>
                <a>
                  <Wrapper
                    width={`20px`}
                    fontSize={`20px`}
                    margin={`0 30px 0 0`}
                  >
                    <SearchOutlined />
                  </Wrapper>
                </a>
              </Link>

              <Image
                src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/header/icon_close_m.png`}
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
            <Link href={`/product?target=0`}>
              <ATag height={`70px`} ju={`flex-start`}>
                <Menu
                  onClick={drawarToggle}
                  isActive={router.pathname.includes(`/product`)}
                >
                  PRODUCT
                </Menu>
              </ATag>
            </Link>
            <Wrapper
              padding={`20px`}
              bgColor={Theme.lightGrey2_C}
              ju={`flex-start`}
              fontSize={`16px`}
              color={Theme.darkGrey_C}
              fontWeight={`600`}
              dr={`row`}
            >
              {productTypes && productTypes.length === 0 ? (
                <Wrapper fontSize={`16px`} color={Theme.grey_C}>
                  조회된 카테고리가 없습니다.
                </Wrapper>
              ) : (
                productTypes.map((data) => {
                  if (data.isHide === 0) {
                    return (
                      <Text
                        width={`calc(100% / 3)`}
                        isHover
                        onClick={() => [moveProduct(data.id), drawarToggle()]}
                        key={data.id}
                        lineHeight={`30px`}
                      >
                        {data.value}
                      </Text>
                    );
                  }
                })
              )}
            </Wrapper>
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
