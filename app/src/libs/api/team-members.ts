import useSWR, { mutate } from "swr";

import { httpClient } from "../http-client";
import { ApiResult } from "./api-result";
import { teamMembersApiUrl } from "./constants";

export type TeamMember = {
  id: string;
  ownerId: string;
  email: string;
  createdAt: Date;
};

export function useTeamMembers() {
  return useSWR(teamMembersApiUrl);
}

export async function mutateTeamMembers() {
  await mutate(teamMembersApiUrl);
}

export async function addTeamMember(email: string) {
  try {
    const response = await httpClient.post(teamMembersApiUrl, {
      json: { email },
    });
    const result = await response.json();
    return ApiResult.success(result);
  } catch (error: any) {
    return ApiResult.failed(error);
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const response = await httpClient.delete(teamMembersApiUrl, {
      json: { id },
    });
    const result = await response.json();
    return ApiResult.success(result);
  } catch (error: any) {
    return ApiResult.failed(error);
  }
}
