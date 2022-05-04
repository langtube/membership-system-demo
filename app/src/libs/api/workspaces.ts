import { message } from "antd";
import useSWR, { mutate } from "swr";

import { httpClient } from "../http-client";
import { workspacesApiUrl } from "./constants";

export type Workspace = {
  id: string;
  ownerId: string;
  name: string;
  createdAt: Date;
};

export function useWorkspaces() {
  return useSWR(workspacesApiUrl);
}

export async function mutateWorkspaces() {
  await mutate(workspacesApiUrl);
}

export async function addWorkspace(name: string) {
  try {
    const response = await httpClient.post(workspacesApiUrl, {
      json: { name },
    });
    return response;
  } catch (e: any) {
    message.error("添加失败" + e?.message, 5000);
  }
}

export async function deleteWorkspace(id: string) {
  try {
    const response = await httpClient.delete(workspacesApiUrl, {
      json: { id },
    });
    return response;
  } catch (e: any) {
    message.error("删除失败" + e?.message, 5000);
  }
}
