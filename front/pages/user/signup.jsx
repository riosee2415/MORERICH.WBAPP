import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, message, Modal } from "antd";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  RsWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";
import DaumPostcode from "react-daum-postcode";

const style = {
  overflow: "hidden",
};

const SignUp = () => {
  ////// GLOBAL STATE //////
  const { st_signUpDone, st_signUpError } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  // INPUT
  const idInput = useInput(``);
  const pwInput = useInput(``);
  const pwCheckInput = useInput(``);
  const nameInput = useInput(``);
  const mobileInput = useInput(``);
  const emailInput = useInput(``);
  // const addressInput = useInput(``);
  // const postcodeInput = useInput(``);
  // const detailAddressInput = useInput(``);

  // BOOLEAN
  const [isTerms, setIsTerms] = useState(false);

  // MODAL
  // const [isAddressModal, setIsAddressModal] = useState(false);

  ////// REDUX //////
  const dispatch = useDispatch();
  const router = useRouter();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_signUpDone) {
      router.push(`/user/login`);

      return message.success("회원가입되었습니다.");
    }

    if (st_signUpError) {
      return message.error(st_signUpError);
    }
  }, [st_signUpDone, st_signUpError]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 회원가입
  const signUpHandler = useCallback(() => {
    if (!idInput.value) {
      return message.error("아이디를 입력해주세요.");
    }
    if (!pwInput.value) {
      return message.error("비밀번호를 입력해주세요.");
    }
    if (!pwCheckInput.value) {
      return message.error("비밀번호 재확인을 입력해주세요.");
    }
    if (pwInput.value !== pwCheckInput.value) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }
    if (!nameInput.value) {
      return message.error("성함을 입력해주세요.");
    }
    if (!mobileInput.value) {
      return message.error("전화번호를 입력해주세요.");
    }
    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }
    if (!isTerms) {
      return message.error("개인정보 처리방침에 동의해주세요.");
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        userId: idInput.value,
        password: pwInput.value,
        username: nameInput.value,
        mobile: mobileInput.value,
        email: emailInput.value,
        terms: isTerms,
      },
    });
  }, [idInput, pwInput, nameInput, mobileInput, emailInput, isTerms]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>MoreRich | SIGNUP</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`180px 0`}>
          <RsWrapper>
            <Wrapper width={`356px`}>
              <Text
                isPoppins
                fontSize={`46px`}
                fontWeight={`bold`}
                margin={`0 0 35px`}
              >
                Join
              </Text>
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *아이디
              </Wrapper>
              <TextInput
                placeholder="ExampleID"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...idInput}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *비밀번호
              </Wrapper>
              <TextInput
                placeholder="비밀번호"
                width={`356px`}
                height={`50px`}
                margin={`0 0 8px`}
                {...pwInput}
                type="password"
              />
              <TextInput
                placeholder="비밀번호 재확인"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...pwCheckInput}
                type="password"
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *성함
              </Wrapper>
              <TextInput
                placeholder="성함"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...nameInput}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                연락처
              </Wrapper>
              <TextInput
                placeholder="(선택사항)'-'를 제외한 연락처"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...mobileInput}
              />
              <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                *이메일
              </Wrapper>
              <TextInput
                placeholder="추후 아이디/비번을 찾기 위한 이메일"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...emailInput}
              />
              {/* <Wrapper al={`flex-start`} margin={`0 0 8px`}>
                주소
              </Wrapper>
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                ju={`space-between`}
                margin={`0 0 8px`}
              >
                <TextInput
                  placeholder="(선택사항)"
                  width={`228px`}
                  height={`50px`}
                  readOnly
                  {...postcodeInput}
                />
                <CommonButton
                  width={`calc(100% - 228px - 8px)`}
                  height={`50px`}
                  fontSize={`16px`}
                  onClick={() => setIsAddressModal(true)}
                >
                  주소검색
                </CommonButton>
              </Wrapper>
              <TextInput
                placeholder="주소"
                width={`356px`}
                height={`50px`}
                margin={`0 0 8px`}
                readOnly
                {...addressInput}
              />
              <TextInput
                placeholder="상세주소"
                width={`356px`}
                height={`50px`}
                margin={`0 0 27px`}
                {...detailAddressInput}
              /> */}
              <Wrapper
                al={`flex-start`}
                padding={`16px`}
                bgColor={Theme.lightGrey2_C}
                margin={`0 0 8px`}
              >
                <Checkbox
                  onChange={() => setIsTerms(!isTerms)}
                  checked={isTerms}
                >
                  개인정보 처리방침에 동의합니다.
                </Checkbox>
              </Wrapper>
              <CommonButton
                width={`356px`}
                height={`50px`}
                fontSize={`16px`}
                fontWeight={`600`}
                onClick={signUpHandler}
              >
                회원가입
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          {/* <Modal
            width={`500px`}
            style={{ top: 200 }}
            footer={null}
            visible={isAddressModal}
            onCancel={() => setIsAddressModal(false)}
          >
            <DaumPostcode
              onComplete={(data) => {
                postcodeInput.setValue(data.zonecode);
                addressInput.setValue(data.address);

                setIsAddressModal(false);
              }}
              width={`600px`}
              height={`500px`}
              autoClose
              animation
              style={style}
            />
          </Modal> */}
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default SignUp;
