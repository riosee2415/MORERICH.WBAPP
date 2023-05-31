import { Button, Checkbox, Form, Input, Table } from "antd";
import styled from "styled-components";

export const ManagementTable = styled(Table)`
  width: 100%;

  & th {
    padding: 6px !important;
  }

  & td {
    padding: 4px !important;
  }
`;

export const ManageButton = styled(Button)`
  padding: 0px 10px;
  height: 24px;

  &:not(:last-child) {
    margin-right: 4px;
  }
`;

export const ManageDelButton = styled(Button)`
  padding: 0px 10px;
  height: 24px;
  background: ${(props) => props.theme.red_C};
  color: ${(props) => props.theme.white_C};

  &:not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    background: ${(props) => props.theme.white_C};
    color: ${(props) => props.theme.red_C} !important;
    border: 1px solid ${(props) => props.theme.red_C} !important;
  }
`;

export const ManageCheckbox = styled(Checkbox)`
  margin-right: 4px;
`;

export const TitleTag = styled.article`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ManageInput = styled(Input)`
  width: ${(props) => props.width};
  height: 24px;
  margin-right: 4px;
`;

export const ManagementForm = styled(Form)`
  width: 100%;
`;

export const SubTitleTag = styled.article`
  color: ${(props) => props.theme.darkGrey2_C};
  font-size: 14px;
`;
