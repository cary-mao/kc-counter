import { defineStore } from "pinia";

const useSearchStore = defineStore("search", {
  state: () => {
    return {
      keys: [],
      keyMap: {},
    };
  },
  actions: {
    register(key, items) {
      this.keys.push(key);
      this.keyMap[key] = items;
    },
    append(key, items) {
      this.keyMap[key].push(items);
    },
  },
});

export default useSearchStore;
