import { PaginationRecord } from "../index";

export interface RecordItem {
  id?: number;
  name?: string;
  state?: number;
  create_time?: string;
  end_time?: string;
}
export type SearchPayload = PaginationRecord & {
  state?: number;
  name?: string;
};