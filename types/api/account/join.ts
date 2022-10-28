import { PaginationRecord } from "../index";

export type SearchParams = PaginationRecord & {
  uid?: number;
  source_id?: number;
  type?: number;
};

export interface RecordItem {
  id?: number;
  source_id?: number;
  uid?: number;
  works_num?: number;
  photo_num?: number;
  last_join_time?: string;
  update_time?: string;
  create_time?: string;
}
