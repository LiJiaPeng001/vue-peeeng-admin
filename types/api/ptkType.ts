import { PaginationRecord, ImageRecord } from "./index";

export type TypePayload = PaginationRecord & { state?: number };
export interface TypeRecord {
  id?: number;
  show_type?: number;
  list_show_type?: number;
  is_enable_lite_list?: number | boolean;
  is_show?: number | boolean;
  is_hidden_child?: number | boolean;
  is_show_all?: number | boolean;
  name?: string;
  icon?: string;
  icons?: ImageRecord[];
  icon_url?: string;
  sort?: number;
  state?: number;
  label_ids?: number[];
  gather_ids?: number[];
  community_camera_tag_type_ids?: number[];
}

export interface TagRecord {
  id: number;
  name: string;
  list?: TagRecord[];
  label_ids?: number[];
}
