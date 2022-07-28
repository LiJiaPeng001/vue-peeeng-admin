import { ComponentOptions } from "vue";

interface Components {
  [props: string]: ComponentOptions;
}

const files = import.meta.globEager("./*/index.vue");
const components: Components = {};

for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    let name = key.replace(/(\.\/|\/index.vue)/g, "");
    components[name] = files[key].default;
  }
}

export default components;
