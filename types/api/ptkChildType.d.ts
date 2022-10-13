import { PaginationRecord } from "./index";

export type TypePayload = PaginationRecord & { state?: number; camera_tag_tab_id?: number };

export interface TypeRecord {
  id?: number;
  camera_tag_tab_id?: number;
  name?: string;
  desc?: string;
  sort?: number;
  state?: number | boolean;
}
