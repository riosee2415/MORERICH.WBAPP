import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  RsWrapper,
  Text,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const MainSliderWrapper = styled(RowWrapper)`
  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    z-index: 10;
    transition: 0.3s;
    margin-top: -20px;
    width: 18px;
    height: 33px;
  }

  .ant-carousel .slick-prev {
    left: 20px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 33px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_prev.svg");
    }

    @media (max-width: 800px) {
      left: 10px;
    }
  }

  .ant-carousel .slick-next {
    right: 20px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 33px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/common/icon_next.svg");
    }
    @media (max-width: 800px) {
      right: 10px;
    }
  }
`;

const MainSlider = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { me } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: MAIN_BANNER_REQUEST,
    });
  }, [me]);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  return (
    <MainSliderWrapper>
      <Carousel
        autoplay={true}
        speed={3000}
        arrows={true}
        dots={false}
        autoplaySpeed={5000}
      >
        {banners &&
          banners.map((data, idx) => {
            return (
              <ColWrapper
                key={idx}
                span={24}
                height={width < 800 ? `400px` : `500px`}
                bgImg={`url(${data.imageURL})`}
                position={`relative`}
                display={`flex !important`}
                cursor={data.linkUseYn ? `pointer` : ``}
                onClick={() =>
                  data.linkUseYn ? moveLinkHandler(data.link) : ""
                }
              >
                <Wrapper
                  height={`100%`}
                  al={`flex-start`}
                  ju={`flex-end`}
                  padding={width < 900 ? `0 20px` : `0 70px`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 700 ? `22px` : `41px`}
                    fontWeight={`600`}
                  >
                    {data.titleUseYn === 1 && (
                      <Text isPoppins>{data.title}</Text>
                    )}
                  </Wrapper>

                  <ColWrapper lineHeight={`1.5`} margin={`12px 0 65px`}>
                    {data.contentUseYn === 1 && (
                      <Text fontSize={`20px`}>{data.content}</Text>
                    )}
                  </ColWrapper>
                </Wrapper>
              </ColWrapper>
            );
          })}
      </Carousel>
    </MainSliderWrapper>
  );
};

export default MainSlider;
