interface ImageRecord {
  url: string;
  [props: string]: any;
}

interface ReturnImageRecord {
  url: string;
  w: number;
  h: number;
  img?: HTMLImageElement;
}

export function getSize(url: string): Promise<ReturnImageRecord> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = function () {
      resolve({
        img,
        url,
        w: img.width,
        h: img.height,
      });
    };

    img.onerror = () => resolve({ url, w: 0, h: 0 });
  });
}

export default async (url: string | ImageRecord[]): Promise<ReturnImageRecord[]> => {
  if (typeof url === "string") {
    const image = await getSize(url);
    return [image];
  }

  return Promise.all(
    url.map(item => {
      return getSize(item.url);
    })
  );
};
