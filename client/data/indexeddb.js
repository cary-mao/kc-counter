/**
 * 因库存数据较多，拟使用indexeddb离线保存库存数据
 */

const indexedDB = window.indexedDB;

export function isSupported() {
  return !!indexedDB;
}
