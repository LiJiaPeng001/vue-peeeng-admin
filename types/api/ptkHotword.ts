import { PaginationRecord } from "./index";

export type TypePayload = PaginationRecord & { number?: number };

export interface TypeRecord {
  number?: number;
  content?: string;
}
