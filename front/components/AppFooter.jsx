import React, { useEffect } from "react";
import {
  Wrapper,
  Text,
  Image,
  WholeWrapper,
  RsWrapper,
  SpanText,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { message } from "antd";

const AppFooter = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  const { logos } = useSelector((state) => state.logo);
  const {
    companys,
    //
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  return (
    <WholeWrapper>
      <Wrapper borderTop={`1px solid ${Theme.black_C}`}></Wrapper>
      <RsWrapper padding={width < 900 ? `50px 0` : `70px 0`}>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          margin={width < 600 ? `0 0 40px` : `0 0 33px`}
        >
          {logos && logos.find((data) => data.typeOf === "F") && (
            <Image
              width={width < 800 ? `68px` : `88px`}
              margin={width < 900 ? `0` : `0 0 20px`}
              src={logos.find((data) => data.typeOf === "F").imageURL}
              alt="logo"
            />
          )}
          <Wrapper
            width={`auto`}
            dr={`row`}
            margin={width < 600 ? `40px 0 0` : `0`}
          >
            <Text
              fontSize={width < 600 ? `18px` : `16px`}
              color={Theme.darkGrey_C}
              isHover
              margin={width < 600 ? `0 50px 0 0` : `0 40px 0 0`}
            >
              이용약관
            </Text>

            <Text
              fontSize={width < 600 ? `18px` : `16px`}
              color={Theme.darkGrey_C}
              isHover
              margin={width < 600 ? `0 55px 0 0` : `0 40px 0 0`}
            >
              환불규정
            </Text>

            <Text
              fontSize={width < 600 ? `18px` : `16px`}
              color={Theme.darkGrey_C}
              isHover
            >
              개인정보처리방침
            </Text>
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`}>
          {companys && (
            <Wrapper al={`flex-start`}>
              <Wrapper dr={`row`} ju={`flex-start`}>
                {companys[0] && (
                  <Text margin={`0 24px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[0].name}
                    </SpanText>
                    {companys[0].value}
                  </Text>
                )}
                {companys[1] && (
                  <Text margin={`0 24px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[1].name}
                    </SpanText>
                    {companys[1].value}
                  </Text>
                )}
                {companys[2] && (
                  <Text margin={`0 24px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[2].name}
                    </SpanText>
                    {companys[2].value}
                  </Text>
                )}
              </Wrapper>

              {companys[3] && (
                <Text margin={`0 6px 0 0`}>
                  <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                    {companys[3].name}
                  </SpanText>
                  {companys[3].value}
                </Text>
              )}
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                {companys[4] && (
                  <Text margin={`0 6px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[4].name}
                    </SpanText>
                    {companys[4].value}
                  </Text>
                )}
                {companys[5] && (
                  <Text margin={`0 6px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[5].name}
                    </SpanText>
                    {companys[5].value}
                  </Text>
                )}
                <SpanText
                  margin={width < 600 ? `0` : `0 24px 0 0`}
                  color={Theme.grey_C}
                  fontSize={width < 600 ? `12px` : `14px`}
                  cursor={`pointer`}
                >
                  [서비스가입사실확인]
                </SpanText>
                {companys[6] && (
                  <Text margin={`0 6px 0 0`}>
                    <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                      {companys[6].name}
                    </SpanText>
                    {companys[6].value}
                  </Text>
                )}
              </Wrapper>
              <Text color={Theme.grey_C}>
                © COPYRIGHT 기업명 ALL RIGHT RESERVED.
              </Text>
            </Wrapper>
          )}
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
