import useSWR, { mutate } from "swr";

import { httpClient } from "../http-client";
import { ApiResult } from "./api-result";
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
    const result = await response.json();
    return ApiResult.success(result);
  } catch (e: any) {
    return ApiResult.failed(e);
  }
}

export async function deleteWorkspace(id: string) {
  try {
    const response = await httpClient.delete(workspacesApiUrl, {
      json: { id },
    });
    const result = await response.json();
    return ApiResult.success(result);
  } catch (e: any) {
    return ApiResult.failed(e);
  }
}
