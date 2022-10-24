import { ImageRecord } from "./index";
import { TypePayload } from "#/api/ptkChildType";

export type SearchPayload = TypePayload & {
  id?: number | string;
  camera_tag_name?: string;
  camera_tag_show_name?: string;
  camera_tag_state?: number;
  camera_tag_tab_id: number;
  camera_tag_child_tab_id: number;
};

export interface TagRecord {
  id: number;
  name: string;
  icon_url: string;
  uid?: number;
}

export interface TabTypeRecord {
  id: number;
  name: string;
}
export type CateResult = TabTypeRecord & {
  camera_tag_child_tabs: CateResult[];
};

export interface TagTypeRecord {
  id: number;
  type_text?: string;
  name?: string;
}

export interface RecordItem {
  id?: number;
  user_avatar?: string;
  user_avatar_url?: string;
  state?: number;
  img_list_data?: ImageRecord[];
  userAvatar?: ImageRecord[];
  images?: ImageRecord[];
  img_list?: string[];
  tabMaps?: number[];
  [props: string]: any;
}
