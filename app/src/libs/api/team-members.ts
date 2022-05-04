import { message } from "antd";
import useSWR, { mutate } from "swr";

import { httpClient } from "../http-client";
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
    return response;
  } catch (e: any) {
    message.error("添加失败" + e?.message, 5000);
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const response = await httpClient.delete(teamMembersApiUrl, {
      json: { id },
    });
    return response;
  } catch (e: any) {
    message.error("删除失败" + e?.message, 5000);
  }
}
