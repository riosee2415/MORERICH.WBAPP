import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";
import wrapper from "../store/configureStore";

const Fourleaf = ({ Component }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>MoreRich | administrator</title>

        <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
        {/* <!-- OG tag  --> */}
        <meta name="subject" content="MoreRich" />
        <meta name="title" content="MoreRich" />
        {/* <!-- OG tag  --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://morerich.co.kr/" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image" content="./og_img.png" />
        <meta property="og:title" content="MoreRich"></meta>
        <meta property="og:site_name" content="MoreRich" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://morerich.co.kr" />

        <meta
          name="keywords"
          content="명품레플리카 ,신발레플리카 , 골프의류레플리카 , 남성레플리카 , 시계레플리카"
        />
        <meta
          property="og:keywords"
          content="명품레플리카 ,신발레플리카 , 골프의류레플리카 , 남성레플리카 , 시계레플리카"
        />

        <meta
          property="og:description"
          content="국내 1위 레플리카 쇼핑몰 취급품목"
        />
        <meta name="description" content="국내 1위 레플리카 쇼핑몰 취급품목" />

        {/* 프리텐다드 폰트 */}
        <link
          href="https://webfontworld.github.io/pretendard/Pretendard.css"
          rel="stylesheet"
        />

        {/* poppins 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Meta Pixel Code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '291197946828103');
            fbq('track', 'PageView');`,
          }}
        ></script>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=291197946828103&ev=PageView&noscript=1"
          />`,
          }}
        ></noscript>

        {/* <!-- End Meta Pixel Code --> */}
      </Head>
      <Component />
    </ThemeProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
