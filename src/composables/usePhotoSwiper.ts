import type { PhotoSwipeOptions } from "photoswipe";
import PhotoSwipe from "photoswipe";
import getImage from "~/utils/getImage";
import "photoswipe/style.css";

let pswp: PhotoSwipe | null;

export default function () {
  let close = () => {
    if (!pswp) return;
    pswp.close();
    pswp = null;
  };
  onBeforeUnmount(close);
  return async (options: PhotoSwipeOptions) => {
    if (!pswp) {
      let dataSource = await getImage(options.dataSource as []);
      pswp = new PhotoSwipe({
        bgOpacity: 0.6,
        ...options,
        dataSource: dataSource.map(item => ({ ...item, src: item.url })),
      });
    }
    pswp.init();
    pswp.on("close", close);
  };
}
