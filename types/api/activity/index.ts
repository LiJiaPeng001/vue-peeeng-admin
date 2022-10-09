import { PaginationRecord } from "../index";

export type SearchPayload = PaginationRecord & {
  state?: number;
  id?: number | string;
  name?: string;
};

export interface RecordItem {
  id?: number;
  name?: string;
  desc?: string;
  sort?: number;
  state_text?: string;
  start_time?: string;
  end_time?: string;
  bg_list_img_url?: string;
  bg_detail_img_url?: string;
  works_num?: number;
  like_num?: number;
  comment_num?: number;
  photo_num?: number;
  works_limit?: number;
}
