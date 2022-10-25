import { PaginationRecord } from "../index";

export interface RecordItem {
  id?: number;
  work_id?: number;
  reply_comment_id?: number;
  source_uid?: number;
  reply_comment_user?: number;
  inform_num?: number;
  user_nick?: string;
  content?: string;
  reply_comment_user_nick?: string;
  create_time?: string;
}

export interface ReplyCommentRecord {
  work_id?: number;
  uid?: number;
  comment_id?: number;
  content?: string;
}

export type SearchPayload = PaginationRecord & {
  comment_id?: number;
  works_id?: number;
  source_uid?: number;
  select_type?: number;
  nick?: string;
  comment?: string;
};
