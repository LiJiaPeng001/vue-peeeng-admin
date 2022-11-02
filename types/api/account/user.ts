import { Dayjs } from "dayjs";
import { PaginationRecord } from "../index";

export type SearchParams = PaginationRecord & {
  id?: number;
  nick?: string;
  phone_number?: string;
  background_img_review_state?: number;
  state?: number;
  gold_number_sort?: boolean;
};

export interface BanParams {
  id?: number;
  state?: number;
  bang_deadline?: string;
  banned_text?: string;
  end_time?: Dayjs;
}
export interface NoSayParams {
  id?: number;
  hour?: number;
}

export interface RecordItem {
  id?: number;
  nick?: string;
  avatar_url?: string;
  avatar?: string;
  background_img_url?: string;
  background_img?: string;
  wait_review_background_img_url?: string;
  wait_review_background_img?: string;
  state_text?: string;
  phone_number?: string;
  recommend_time?: string;
  create_time?: string;
  birthday?: string;
  banned_to_post_deadline?: string;
  bang_deadline?: string;
  state?: number;
  level?: number;
  hidden_love_user_number?: number;
  recommend_num?: number;
  inform_num?: number;
  illegal_num?: number;
  gold_number?: number;
  is_white_user?: boolean;
}
