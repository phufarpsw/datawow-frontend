import { AxiosError, isAxiosError } from "axios";

export interface IFormattedErrorResponse {
  message?: string;
  infoMessage?: string;
  status?: number;
  statusText?: string;
}

export function formattedError(
  error: AxiosError<IFormattedErrorResponse> | unknown
): IFormattedErrorResponse {
  if (isAxiosError(error)) {
    const response = error.response;
    if (response) {
      const { message, errors } = response.data;
      const infoMessage = errors ?? "";
      return {
        message,
        infoMessage,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  return {
    message: "error",
  };
}
