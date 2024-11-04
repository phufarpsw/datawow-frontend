import { getInstance } from "@/api/apiClient";
import { formattedError } from "@/utils/formattedError";

export interface ILogin {
  username: string;
}

export interface IUser {
  id: string;
  username: string;
}

export async function login(body: ILogin) {
  try {
    const { data } = await getInstance().post("/user/login", body);
    return data;
  } catch (error) {
    return formattedError(error);
  }
}
