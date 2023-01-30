import type { PluginOption } from "vite";

export default function (): PluginOption {
  return {
    name: "vite:test",
    transform() {
      return;
    },
  };
}
