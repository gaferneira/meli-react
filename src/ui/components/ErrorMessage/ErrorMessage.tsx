import { Failure } from "@/domain";
import React from "react";
import styled from "styled-components";
export interface ErrorInterface {
  failure?: Failure;
}

const ErrorMessage: React.FC<ErrorInterface> = () => {
  return <ErrorMessageStyle>Error</ErrorMessageStyle>;
};

export const ErrorMessageStyle = styled.div``;

export default ErrorMessage;
