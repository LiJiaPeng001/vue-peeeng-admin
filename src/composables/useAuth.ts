import { Ref } from "vue";
import { UserInfo } from "#/api/user";

type LocalName = "peng_admin";
type LocalTypes<T> = T extends "peng_admin" ? UserInfo : never;

export default <T extends LocalName = "peng_admin">(localname?: T): Ref<LocalTypes<T>> =>
  useLocalStorage(localname ?? "peng_admin", {}) as unknown as Ref<LocalTypes<T>>;
