export interface ObjectMaps {
  [props: string]: string;
}
export interface ArrayMaps {
  label?: string;
  value?: string;
}

export type MapKey = keyof ObjectMaps;

export const stateMaps: ObjectMaps = {
  "-1": "全部",
  0: "下架",
  1: "上架",
};

export const linkMaps: ObjectMaps = {
  0: "当前页面",
  1: "新开页面",
  2: "第三方AP",
};
export const modeMaps: ArrayMaps[] = [
  { label: "拍照 ", value: "" },
  { label: "GIF", value: "GIF" },
  { label: "视频", value: "VIDEO" },
  { label: "LivePhoto (仅IOS支持，Android仍为普通拍照)", value: "LIVEPHOTO" },
];
