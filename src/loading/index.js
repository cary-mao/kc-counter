/**
 * loading模块用于网络请求的集中化处理
 */
import { Toast } from "vant";

const map = Object.create(null);

/**
 * 装载loading，以tag标示
 * @param {string} tag
 * @param {function} loadingFn
 * @param {function} closeFn
 */
export function setup(
  tag,
  loadingFn = defaultLoadingFn,
  closeFn = defaultCloseFn
) {
  map[tag] = {
    loadingFn,
    closeFn,
  };
}

export function loading(tag, ...args) {
  map[tag].apply(null, args);
}

export function close(tag) {
  map[tag].apply(null, args);
}

function defaultLoadingFn(message, opts) {
  Toast.loading({
    message,
    ...opts,
  });
}

function defaultCloseFn() {
  Toast.clear();
}
