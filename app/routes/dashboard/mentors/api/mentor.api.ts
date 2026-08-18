import { api } from "~/shared/api/api.axios";

export interface Mentor {
  id: number;
  First_name: string;
  Last_name: string;
  email: string;
  email_verified_at: string;
  device_id: string;
  fcm_token: string | null;
  created_at: string;
  updated_at: string;
  courses_count: number;
}

export interface PaginatedMentorsResponse {
  current_page: number;
  data: Mentor[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  per_page: number;
  total: number;
}

export const getMentors = async (): Promise<Mentor[]> => {
  const response = await api.get<
    PaginatedMentorsResponse | string
  >("/admin/dashboard/teachers");

  let data: PaginatedMentorsResponse;

  if (typeof response.data === "string") {
    data = JSON.parse(
      response.data.replace(/^\uFEFF/, "")
    );
  } else {
    data = response.data;
  }



  return data.data;
};