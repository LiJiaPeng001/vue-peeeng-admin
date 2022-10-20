import { PaginationRecord } from "../index";

export interface RecordItem {
  id?: number;
  is_illegal?: boolean;
  delete_time?: string;
  disable_comment?: number
}

export interface RealImgRecord {
  file_name: string
}

export interface CheckParams {
  score: number;
  ids: number[]
}

export interface AutoLikeParams {
  ids?: number[];
  like_limit_number?: number;
  follow_limit_number?: number;
}

export type SearchPayload = PaginationRecord & {
  state?: number;
  nick?: string;
  id?: number;
  uid?: number;
  review_state?: number;
  phone_number?: string;
  activity_id?: number;
  topic_id?: number;
  order?: number;
  score?: number;
  is_only_illegal?: boolean;
  is_only_white_work?: boolean;
  is_only_video_work?: boolean;
  is_not_show_activity?: boolean;
  is_not_show_tool_user?: boolean;
  camera_tag_off?: boolean;
  subfield_id?: number;
  start_time?: string;
  end_time?: string;
  real_img_list?: RealImgRecord[]
};