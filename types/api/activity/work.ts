import { Dayjs } from "dayjs";
import { PaginationRecord } from "../index";

export type SearchParams = PaginationRecord & {
  activity_id?: number;
  type: "hot" | "new";
};

export interface RecordItem {
  id?: number;
  works_id?: number;
  activity_id?: number;
  works_uid?: number;
  start_line?: string;
  end_line?: string;
  update_time?: string;
  create_time?: string;
  start_time?: Dayjs;
  end_time?: Dayjs;
}
