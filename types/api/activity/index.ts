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

export interface GoldConfig {
  lte: number;
  gte: number;
  gold_number: number;
}

export interface RecordItem {
  id?: number;
  name?: string;
  rule?: string;
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
  camera_tag_preview_mode?: number;
  android_tag_ids?: number[];
  ios_tag_ids?: number[];
  android_tags?: StickerTagType[];
  ios_tags?: StickerTagType[];
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
  speedy_comment_button_imgs?: ImageRecord[];
  speedy_comment_show_imgs?: ImageRecord[];
  speedy_comment_frame_imgs?: ImageRecord[];
  speedy_comment_content?: string;
  speedy_comment_button_img?: string;
  speedy_comment_button_img_url?: string;
  speedy_comment_show_img?: string;
  speedy_comment_show_img_url?: string;
  speedy_comment_frame_img?: string;
  speedy_comment_frame_img_url?: string;
  share_background_imgs?: ImageRecord[];
  share_frame_imgs?: ImageRecord[];
  share_top_imgs?: ImageRecord[];
  share_banner_imgs?: ImageRecord[];
  share_background_img?: string;
  share_background_img_url?: string;
  share_frame_img?: string;
  share_frame_img_url?: string;
  share_top_img?: string;
  share_top_img_url?: string;
  share_banner_img?: string;
  share_banner_img_url?: string;
  share_outline_color?: string;
  share_fill_color?: string;
  share_projection_color?: string;
  share_title?: string;
  share_desc?: string;
  weibo_topics?: string;
  sync_weibo?: number;
  ranking_award_gold_config?: GoldConfig[];
}
