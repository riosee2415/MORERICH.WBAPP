import React, { useEffect, useCallback } from "react";
import { Wrapper, Image, Text, SquareBox, SpanText } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel, Empty, message } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const NewSliderWrapper = styled(Wrapper)`
  justify-content: flex-start;

  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-slider {
    height: 100%;
    overflow: inherit;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 27px;
    height: 27px;
    z-index: 10;
    transition: 0.3s;
  }

  .ant-carousel .slick-prev {
    left: -30px;
    @media (max-width: 900px) {
      left: 0;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 33px;
      transform: translate(-50%, -50%);
      background-size: cover;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg");
    }
  }
  .ant-carousel .slick-next {
    right: -30px;
    @media (max-width: 900px) {
      right: 0;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 33px;
      transform: translate(-50%, -50%);
      background-size: cover;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_next.svg");
    }
  }

  @media (max-width: 900px) {
    & .slick-list {
      padding: 0 !important;
    }
  }
`;

const SliderWrapper = styled(Carousel)`
  overflow: hidden;

  & .slick-list {
    width: auto;
  }
`;

const NewSlider = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const bannerData = [
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod2.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod3.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod4.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
    {
      imgUrl:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/prod-page/img_prod1.png",
      title: "CASESTUDY",
      name: "[CASESTUDY GOLF CLUB X BALANSA] BALANSA BAG",
      price: "2,100,000원",
      salePrice: "1,100,000원",
    },
  ];

  return (
    <NewSliderWrapper>
      <SliderWrapper
        autoplay={true}
        speed={1000}
        swipeToSlide={true}
        autoplaySpeed={6000}
        slidesToShow={width < 1100 ? (width < 900 ? 1 : 3) : 4}
        centerMode={width < 900 && true}
        centerPadding={width < 900 && `50px`}
        dots={false}
        arrows={true}
      >
        {bannerData && bannerData.length === 0 ? (
          <Wrapper padding={`100px 0`}>
            <Empty description="조회된 내역이 없습니다." />
          </Wrapper>
        ) : (
          bannerData.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                padding={`0 15px`}
                cursor={`pointer`}
              >
                <Wrapper al={`flex-start`}>
                  <SquareBox>
                    <Image alt="thumbnail" src={data.imgUrl} />
                  </SquareBox>

                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    fontWeight={`600`}
                    margin={`23px 0 12px`}
                  >
                    {data.title}
                  </Text>

                  <Text fontSize={width < 900 ? `15px` : `17px`}>
                    {data.name}
                  </Text>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`16px 0 20px`}
                    fontSize={width < 900 ? `15px` : `20px`}
                  >
                    <Text
                      color={Theme.grey_C}
                      className="line"
                      margin={`0 12px 0 0`}
                    >
                      {data.price}
                    </Text>
                    <Text>{data.price}</Text>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <Image
                      alt="heart icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                      width={`22px`}
                      margin={`0 18px 0 0`}
                    />
                    <Image
                      alt="cart icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_cart.png`}
                      width={`22px`}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            );
          })
        )}
      </SliderWrapper>
    </NewSliderWrapper>
  );
};

export default NewSlider;
