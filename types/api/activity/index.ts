import { PaginationRecord, ImageRecord } from "../index";
import type { Dayjs } from "dayjs";

export type SearchPayload = PaginationRecord & {
  state?: number;
  id?: number | string;
  name?: string;
};

export interface StickerTagType {
  id: number;
  icon_url: string;
}
export interface RecordItem {
  id?: number;
  name?: string;
  desc?: string;
  sort?: number;
  state?: number;
  official_uid?: number;
  style_type?: number;
  join_text?: string;
  bg_detail_imgs?: ImageRecord[];
  bg_detail_img?: string;
  bg_detail_img_url?: string;
  state_text?: string;
  start_time?: string;
  end_time?: string;
  works_num?: number;
  like_num?: number;
  comment_num?: number;
  photo_num?: number;
  works_limit?: number;
  intervalTime?: Dayjs[];
  is_has_award?: number;
  is_top?: number;
  is_has_prop?: number;
  is_freeze?: number;
  freeze_number?: number;
  is_show_award_list?: number;
  is_show_ranking_list?: number;
  ranking_number?: number;
  ranking_like_num_line?: number;
  is_show_choicness_list?: number;
  recommend_work_id?: number;
  camera_tag_open_type?: number;
  camera_tag_preview_mode?: string;
  android_tag_ids: number[];
  ios_tag_ids: number[];
  android_tags: StickerTagType[];
  ios_tags: StickerTagType[];
  award_imgs?: ImageRecord[];
  award_img_url_skip_type?: number;
  award_img_skip_url?: string;
  award_img?: string;
  award_img_url?: string;
  camera_tag_tab_id?: number;
  camera_tag_tab_child_tab_type?: number;
  camera_tag_tab_child_tab_id?: number;
  use_speedy_comment_limit?: number;
  background_color?: string;
}
