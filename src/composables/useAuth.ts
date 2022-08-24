import { Ref } from "vue";
import { UserInfo } from "#/store";

type LocalName = "wuta_community_admin" | "wt_lang_data";
type LocalTypes<T> = T extends "wuta_community_admin" ? UserInfo : never;

export default <T extends LocalName = "wuta_community_admin">(localname?: T): Ref<LocalTypes<T>> =>
  useLocalStorage(localname ?? "wuta_community_admin", {}) as unknown as Ref<LocalTypes<T>>;
