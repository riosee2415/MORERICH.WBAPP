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
      <RsWrapper padding={`70px 0`}>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          margin={width < 600 ? `0 0 40px` : `0 0 33px`}
        >
          <Image
            width={width < 600 ? `128px` : `88px`}
            alt="logo"
            src={
              width < 600
                ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/logo/logo_m.png`
                : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/morerich/assets/images/logo/logo_footer.svg`
            }
          />
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
                <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                  사업자등록번호
                </SpanText>
                {companys[1] && (
                  <Text
                    margin={`0 24px 0 0`}
                  >{`${companys[1].name} ${companys[1].value}`}</Text>
                )}
                <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                  대표전화
                </SpanText>
                {companys[2] && (
                  <Text>{`${companys[2].name} ${companys[2].value}`}</Text>
                )}
              </Wrapper>
              <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                주소
              </SpanText>
              {companys[3] && (
                <Text>{`${companys[3].name} ${companys[3].value}`}</Text>
              )}
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                  통신판매업신고
                </SpanText>
                {companys[4] && (
                  <Text
                    margin={`0 24px 0 0`}
                  >{`${companys[4].name} ${companys[4].value}`}</Text>
                )}
                <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                  결제대금예치업 등록번호
                </SpanText>
                {companys[5] && (
                  <Text
                    margin={`0 6px 0 0`}
                  >{`${companys[5].name} ${companys[5].value}`}</Text>
                )}
                <SpanText
                  margin={width < 600 ? `0` : `0 24px 0 0`}
                  color={Theme.grey_C}
                  fontSize={width < 600 ? `13px` : `14px`}
                  cursor={`pointer`}
                >
                  [서비스가입사실확인]
                </SpanText>
                <SpanText margin={`0 6px 0 0`} color={Theme.grey_C}>
                  개인정보관리 책임자
                </SpanText>
                {companys[6] && (
                  <Text
                    margin={`0 26px 0 0`}
                  >{`${companys[6].name} ${companys[6].value}`}</Text>
                )}
              </Wrapper>
              <Text color={Theme.grey_C}>
                © COPYRIGHT 기업명 ALL RIGHT RESERVED.
              </Text>
            </Wrapper>
          )}
        </Wrapper>

        {logos &&
          logos.length === 0 &&
          logos.find((data) => data.typeOf === "F") && (
            <Image
              width={width < 800 ? `100px` : `170px`}
              src={logos.find((data) => data.typeOf === "F").imageURL}
              alt="logo"
            />
          )}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
