import ky, { HTTPError } from "ky";

export const httpClient = ky.create({
  credentials: "include",
  throwHttpErrors: false,
  hooks: {
    beforeError: [
      (err: HTTPError) => {
        if (err.response.status === 401 || err.response.status === 403) {
          document.location.replace("/app/auth/signin");
        }
        console.error("ky hooks beforeError", err);
        return err;
      },
    ],
  },
});
