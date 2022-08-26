import { FileOptions } from "#/upload";

let input: HTMLInputElement;

export function getFiles(options: FileOptions = { multiple: false, accept: "image/*" }): Promise<FileList> {
  return new Promise(resolve => {
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.style.position = "fixed";
      input.style.top = "-1000px";
      document.body.append(input);
    }
    input.multiple = options.multiple || false;
    input.accept = options.accept || "image/*";
    input.value = "";
    input.click();
    input.onchange = function () {
      resolve(input.files as FileList);
    };
  });
}

// 获取file地址
export function getObjectURL(file: File): string {
  let url = "";
  if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

export async function getFileUrl(options: FileOptions = { multiple: false, accept: "image/*" }) {
  let files = await getFiles(options);
  let urls: any[] = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    urls.push({
      url: getObjectURL(file),
      file,
    });
  }
  return urls;
}
