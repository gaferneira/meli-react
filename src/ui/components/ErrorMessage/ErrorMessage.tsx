import type { Failure } from "@/domain";
import type React from "react";
import styled from "@emotion/styled";
export interface ErrorInterface {
  failure?: Failure;
}

const ErrorMessage: React.FC<ErrorInterface> = () => {
  return <ErrorMessageStyle>Error</ErrorMessageStyle>;
};

export const ErrorMessageStyle = styled.div``;

export default ErrorMessage;
