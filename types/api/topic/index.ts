// import { PaginationRecord } from "../index";

export interface RecordItem {
  id?: number;
  name?: string;
  list: RecordItem[];
}
