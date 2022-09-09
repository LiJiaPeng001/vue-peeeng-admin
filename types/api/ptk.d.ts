export interface SearchPayload {
  id?: number | string;
  page?: number;
  limit?: number;
  camera_tag_name?: string;
  camera_tag_tab_id: number;
  camera_tag_child_tab_id: number;
}

export interface CateResult {
  name: string;
  id: number;
  camera_tag_child_tabs: CateResult[];
}

export interface RecordItem {
  state?: number;
  [props: string]: any;
}

export type RecordRawItem = { id: number } & RecordItem;
