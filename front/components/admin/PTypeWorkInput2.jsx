import React, { useCallback, useEffect, useState } from "react";
import { ManageInput, ManageButton } from "../managementComponents";
import { Wrapper } from "../commonComponents";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { MODIFY_TYPE_2DEPTH_REQUEST } from "../../reducers/store";

const WorkInputTag = styled(ManageInput)`
  width: calc(100% - 65px);

  &:read-only {
    background: ${(props) => props.theme.lightGrey_C};
  }
`;

const PTypeWorkInput2 = ({ compare, initValue = "", row, type = "text" }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initValue);
  const [permmit, setPermmit] = useState(false);
  const [reRow, setReRow] = useState(row);

  useEffect(() => {
    setValue(initValue);
    setPermmit(false);
  }, [initValue]);

  useEffect(() => {
    setReRow(row);
    setPermmit(false);
  }, [row]);

  const truePermmit = useCallback(() => {
    setPermmit(true);
  }, []);

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const actionHandler = useCallback(() => {
    if (compare === "value") {
      dispatch({
        type: MODIFY_TYPE_2DEPTH_REQUEST,
        data: {
          value: value,
          id: reRow.id,
        },
      });
    }

    setPermmit(false);
  }, [value]);

  const enterHandler = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        actionHandler();
      }
    },
    [value]
  );

  return (
    <Wrapper dr="row" ju="flex-start">
      <WorkInputTag
        type={type}
        value={value}
        readOnly={!permmit}
        onChange={onChangeValue}
        onKeyDown={enterHandler}
      />

      {permmit ? (
        <ManageButton type="primary" onClick={actionHandler}>
          저장
        </ManageButton>
      ) : (
        <ManageButton type="default" onClick={truePermmit}>
          제어
        </ManageButton>
      )}
    </Wrapper>
  );
};

export default PTypeWorkInput2;
