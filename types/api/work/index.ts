import { PaginationRecord } from "../index";
import { TagRecord } from "../ptk";

export interface RecordItem {
  id?: number;
  is_illegal?: boolean;
  delete_time?: string;
  disable_comment?: number;
  is_auto_like?: boolean;
  review_state?: number;
  real_img_list?: RealImgRecord[];
  tag_type?: number;
  cover_url?: string;
  award_config_id?: number;
  android_camera_tag_id?: number;
  ios_camera_tag_id?: number;
  camera_tag_open_type?: number;
  camera_tag_preview_mode?: string;
  android_camera_tag?: TagRecord;
  ios_camera_tag?: TagRecord;
  compile_choiceness_time?: string;
  channel_id?: number;
  topic_id?: number;
  activity_id?: number;
  tagType?: number;
}

export interface RealImgRecord {
  file_name: string;
  original_file_name: string;
}
export interface ResolveRecord {
  score?: number;
  id?: number;
  gold_number?: number;
  subfield_ids?: number[];
}
export interface FindRecord {
  id?: number;
  img_array?: string[];
}
export interface RejectRecord {
  id?: number;
  review_img?: number;
  review_content?: number;
  review_desc?: string;
  disable_image_array?: number[];
}

export interface CheckParams {
  score: number;
  ids: number[];
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
  real_img_list?: RealImgRecord[];
};
