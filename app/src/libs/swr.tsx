import { SWRConfig } from "swr";

import { httpClient } from "./http-client";

export const SWRGlobalConfig = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          try {
            const response = await httpClient.get(url);
            const result = await response.json();
            return result;
          } catch (e: any) {
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
