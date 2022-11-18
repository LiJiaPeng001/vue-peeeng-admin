import presetRemToPx from "@unocss/preset-rem-to-px";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from "unocss";

export default defineConfig({
  theme: {
    extends: {
      animation: {
        fadeIn: "fadeIn 0.3s linear",
      },
    },
  },
  shortcuts: [
    ["center-flex", "flex justify-center items-center"],
    ["middle-flex", "flex items-center"],
    ["btn", "m-r-6 inline-block cursor-pointer"],
    ["primary", "btn c-hex-1890ff"],
    ["danger", "btn c-hex-f5222d"],
    ["cover", "bg-cover bg-center"],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "DM Sans",
        serif: "DM Serif Display",
        mono: "DM Mono",
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
});
