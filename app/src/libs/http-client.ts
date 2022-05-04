import ky, { HTTPError } from "ky";
import { ServerExceptionDto, signinUrl } from "./api";
import { ApiError } from "./api/api-error";

export const httpClient = ky
  .create({
    credentials: "include",
  })
  .extend({
    hooks: {
      beforeError: [
        async (err: HTTPError) => {
          console.error("ky beforeError: ", err);
          if (err.response.status === 401 || err.response.status === 403) {
            document.location.replace(signinUrl);
          }
          const result: ServerExceptionDto = await err.response.json();
          throw new ApiError(result);
        },
      ],
    },
  });
