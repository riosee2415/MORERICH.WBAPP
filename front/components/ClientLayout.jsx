import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { withResizeDetector } from "react-resize-detector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { WholeWrapper } from "./commonComponents";

const ClientLayout = ({ children, width }) => {
  return (
    <section>
      {/* HEADER */}
      {/* <AppHeader /> */}
      {/* content */}
      <WholeWrapper padding={`120px 0 0`}>{children}</WholeWrapper>
      {/* Footer */}
      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(ClientLayout);
