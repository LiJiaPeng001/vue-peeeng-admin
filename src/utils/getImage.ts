interface ImageRecord {
  src: string;
  [props: string]: any;
}

interface ReturnImageRecord {
  src: string;
  width: number;
  height: number;
  img?: HTMLImageElement;
}

export function getSize(src: string): Promise<ReturnImageRecord> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = function () {
      resolve({
        img,
        src,
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => resolve({ src, width: 0, height: 0 });
  });
}

export default async (src: string | ImageRecord[]): Promise<ReturnImageRecord[]> => {
  if (typeof src === "string") {
    const image = await getSize(src);
    return [image];
  }

  return Promise.all(
    src.map(item => {
      return getSize(item.src);
    })
  );
};
