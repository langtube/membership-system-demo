import { message } from "antd";

import { httpClient } from "../http-client";
import { signinApiUrl } from "./constants";

export async function signin(data: any) {
  try {
    const response = await httpClient.post(signinApiUrl, {
      json: data,
      throwHttpErrors: false,
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    }
  } catch (e: any) {
    message.error("登陆失败：" + e?.message, 5000);
  }
}
