import type { PhotoSwipeOptions } from "photoswipe";
import PhotoSwipe from "photoswipe";
import getImage from "~/utils/getImage";
import "photoswipe/style.css";

let pswp: any;

export default function () {
  let preview = async (options: PhotoSwipeOptions) => {
    if (!pswp) {
      let images = await getImage(options.dataSource as []);
      pswp = new PhotoSwipe({
        bgOpacity: 0.6,
        ...options,
        dataSource: images,
      });
    }
    pswp.init();
    pswp.on("close", close);
  };
  let close = () => {
    if (!pswp) return;
    pswp.close();
    pswp = null;
  };
  onBeforeUnmount(close);
  return preview;
}
