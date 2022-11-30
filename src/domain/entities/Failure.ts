import { CanceledError } from "axios";

export interface Failure {
  message: string;
  code: FAILURE;
}

export enum FAILURE {
  ServerError = 500,
  CanceledError = -1,
  AuthenticationError = 400,
  UnknownException = 0,
}

export const analyzeException = (exception: any): Failure => {
  let code = FAILURE.UnknownException;
  let message = "";
  if (exception instanceof Error) {
    if (exception.message === "canceled") {
      code = FAILURE.CanceledError;
    }
  }
  return { code, message };
};
