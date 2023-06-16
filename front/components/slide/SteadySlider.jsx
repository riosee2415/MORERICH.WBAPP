import React, { useEffect, useCallback, useState } from "react";
import { Wrapper, Image, Text, SquareBox, SpanText } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel, Empty, message } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { LIKE_CREATE_REQUEST } from "../../reducers/wish";

const SteadySliderWrapper = styled(Wrapper)`
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
      background-image: url("https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg");
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
      background-image: url("https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_next.svg");
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
    height: 488px;
    width: auto;
  }
`;

const SteadySlider = ({ datum, likeId, setLikeId }) => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  // 좋아요
  const likeHandler = useCallback(
    (data) => {
      if (!me) {
        return message.error("로그인 후 이용할 수 있습니다.");
      }

      if (data.exWish !== null) {
        setLikeId(null);
      } else {
        setLikeId(data.ProductId);
      }

      dispatch({
        type: LIKE_CREATE_REQUEST,
        data: {
          ProductId: data.ProductId,
          id: data.exWish,
        },
      });
    },
    [likeId, me]
  );

  return (
    <SteadySliderWrapper>
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
        {datum && datum.length === 0 ? (
          <Wrapper padding={`100px 0`}>
            <Empty description="조회된 내역이 없습니다." />
          </Wrapper>
        ) : (
          datum &&
          datum.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                padding={`0 15px`}
                cursor={`pointer`}
              >
                <Wrapper al={`flex-start`}>
                  <SquareBox
                    onClick={() => [
                      router.push(`/product/${data.ProductId}`),
                      window.scrollTo({ top: 0, behavior: "smooth" }),
                    ]}
                  >
                    <Image alt="thumbnail" src={data.thumbnail} />
                  </SquareBox>

                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    fontWeight={`600`}
                    margin={`23px 0 12px`}
                  >
                    {data.name}
                  </Text>

                  <Text fontSize={width < 900 ? `15px` : `17px`}>
                    {data.subName}
                  </Text>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`16px 0 20px`}
                    fontSize={width < 900 ? `15px` : `20px`}
                  >
                    {data.discount !== 0 && (
                      <Text
                        color={Theme.grey_C}
                        className="line"
                        margin={`0 12px 0 0`}
                      >
                        {data.viewPrice}
                      </Text>
                    )}
                    <Text>{data.viewCalcPrice}</Text>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    {data.exWish !== null ? (
                      <Image
                        alt="heart icon"
                        src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish_full.png`}
                        width={`22px`}
                        margin={`0 18px 0 0`}
                        onClick={() => likeHandler(data)}
                      />
                    ) : (
                      <Image
                        alt="heart icon"
                        src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_wish.png`}
                        width={`22px`}
                        margin={`0 18px 0 0`}
                        onClick={() => likeHandler(data)}
                      />
                    )}
                    {/* <Image
                      alt="cart icon"
                      src={`https://morerich.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_cart.png`}
                      width={`22px`}
                    /> */}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            );
          })
        )}
      </SliderWrapper>
    </SteadySliderWrapper>
  );
};

export default SteadySlider;
