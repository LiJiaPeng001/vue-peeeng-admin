export interface RequestRecord<T> {
  count: number;
  list: Array<T>;
}

export interface PaginationRecord {
  limit?: number;
  page?: number;
}

export interface ImageRecord {
  url?: string;
  filename?: string;
  file?: File;
}

export interface HomeTabsRecord {
  id?: number;
  name?: string
}