let cache = {};

/**
 * save data in local storage
 */
const storage = window.localStorage;

export function set(key, val) {
  const type = typeof val;

  if (!cache.__keys__) {
    cache.__keys__ = stoarge.getItem("__keys__") || [];
  }

  cache.__keys__.push({ key, type });
  storage.setItem("__keys__", JSON.stringify(cache.__keys__));

  if (type !== "string") {
    val = JSON.stringify(val);
  }

  storage.setItem(key, val);
}

export function get(key) {
  if (cache[key]) {
    return cache[key];
  }

  const keyJSONs = JSON.parse(storage.getItem("__keys__"));
  if (!keyJSONs) {
    return;
  }
  const matchedKeyJSON = keyJSONs.find((keyJSON) => keyJSON.key === key);
  if (matchedKeyJSON) {
    return parseDataStr(storage.getItem(key), matchedKeyJSON.type);
  }

  return null;
}

export function load() {
  const keyJSONsStr = storage.getItem("__keys__");
  if (!keyJSONsStr) {
    return;
  }
  let keyJSONs = JSON.parse(keyJSONsStr);
  keyJSONs.forEach((keyJSON) => {
    cache[keyJSON.key] = parseDataStr(
      storage.getItem(keyJSON.key),
      keyJSON.type
    );
  });
}

export function clear() {
  cache = {};
  storage.clear();
}

export function remove(key) {
  if (!cache[key]) {
    return;
  }

  let keyJSONs = JSON.parse(storage.getItem("__keys__"));
  keyJSONs = keyJSONs.filter((keyJSON) => keyJSON.key !== key);
  if (keyJSONs.length) {
    storage.setItem("__keys__", JSON.stringify(keyJSONs));
  } else {
    storage.removeItem("__keys__");
  }

  storage.removeItem(key);
}

function parseDataStr(str, type) {
  let val = str;
  if (type !== "string") {
    val = JSON.parse(val);
  }
  return val;
}
