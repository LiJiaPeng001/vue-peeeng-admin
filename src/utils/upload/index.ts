import { FileOptions } from "#/upload";
import { message } from "ant-design-vue";

let input: HTMLInputElement;

export function getFiles(options: FileOptions = {}): Promise<FileList> {
  let { multiple = false, accept = "image/*" } = options;
  return new Promise(resolve => {
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.style.position = "fixed";
      input.style.top = "-1000px";
      document.body.append(input);
    }
    input.multiple = multiple || false;
    input.accept = accept || "image/*";
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

export async function getFileUrl(options: FileOptions = { multiple: false, accept: "image/*", size: 10 }) {
  let { size = 10 } = options;
  let files = await getFiles(options);
  let urls: any[] = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (file.size > size * 1024 * 1024) {
      message.warning(`${file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name}文件超过了${size}MB`);
      continue;
    }
    urls.push({
      url: getObjectURL(file),
      file,
    });
  }
  return urls;
}
