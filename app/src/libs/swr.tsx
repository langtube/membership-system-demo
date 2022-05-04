import { SWRConfig } from "swr";
import { message } from "antd";

import { ServerExceptionDto } from "./api";
import { httpClient } from "./http-client";

export const SWRGlobalConfig = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          try {
            const response = await httpClient.get(url);
            if (!response.ok) {
              const dto: ServerExceptionDto = await response.json();
              throw dto;
            }
            return response.json();
          } catch (e: any) {
            message.error("获取数据失败 " + e?.message);
            throw e;
          }
        },
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
