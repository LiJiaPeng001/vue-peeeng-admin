import { Ref } from "vue";

type LocalName = "wuta_community_admin" | "wt_lang_data";

export default <T>(name: LocalName = "wuta_community_admin"): Ref<T> => useLocalStorage(name, {}) as unknown as Ref<T>;
