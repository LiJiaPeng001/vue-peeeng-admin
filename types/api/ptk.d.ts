export interface SearchPayload {
  id?: number | string;
  page?: number;
  limit?: number;
  state?: number;
  camera_tag_name?: string;
  camera_tag_show_name?: string;
  camera_tag_state?: number;
  camera_tag_tab_id: number;
  camera_tag_child_tab_id: number;
}

export interface ListResult {
  count: number;
  list: RecordItem[];
}

export interface CateResult {
  name: string;
  id: number;
  camera_tag_child_tabs: CateResult[];
}

export interface TypeRecord {
  id: number;
  type_text?: string;
  name?: string;
}

export interface RecordItem {
  id?: number;
  user_avatar?: string;
  user_avatar_url?: string;
  state?: number;
  img_list_data?: RecordImagesData[];
  userAvatar?: RecordImagesData[];
  images?: RecordImagesData[];
  img_list?: string[];
  tabMaps?: number[];
  [props: string]: any;
}

export interface RecordImagesData {
  url: string;
  filename?: string;
  file?: File;
}
