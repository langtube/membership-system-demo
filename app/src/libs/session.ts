import { message } from "antd";
import create from "zustand";

import { profileApiUrl } from "./api/constants";
import { httpClient } from "./http-client";

export type User = {
  id: string;
  role: string;
  accessTags: Record<string, string | number>;
};

export type UserSessionStore = {
  user: User | null;
  init: () => Promise<void>;
  clear: () => void;
};

export const useUserSessionStore = create<UserSessionStore>((set, get) => ({
  user: null,
  init: async () => {
    let user = get().user;
    if (!user) {
      user = await fetchProfile();
      if (user) {
        set({ user });
      }
    }
  },
  clear: () => {
    set({ user: null });
    return true;
  },
}));

async function fetchProfile() {
  try {
    const response = await httpClient.get(profileApiUrl);
    const result = await response.json();
    if (response.ok) {
      return result;
    }
  } catch (e: any) {
    message.error("获取用户数据失败 " + e?.message);
  }
}
