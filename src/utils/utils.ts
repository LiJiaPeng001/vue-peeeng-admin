export interface ObjectMaps {
  [props: string]: string;
}

export type MapKey = keyof ObjectMaps;

export const stateMaps = {
  "-1": "全部",
  0: "下架",
  1: "上架",
};

export const linkMaps: ObjectMaps = {
  0: "当前页面",
  1: "新开页面",
  2: "第三方AP",
};
