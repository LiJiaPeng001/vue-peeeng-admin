export interface UploadOptions {
  type?: number;
}
export interface UploadPayload {
  file: File;
  type: number;
}
export interface UploadResult {
  file_name: string;
  size: string;
}
export interface FileOptions {
  multiple?: boolean;
  accept?: string;
  size?: number;
}
