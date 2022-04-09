import { defineStore } from "pinia";

const useConfigureStore = defineStore("inventory", {
  state: () => {
    return {
      curInventoryListId: null,
      inventoryListMap: new Map(),
    };
  },
  actions: {
    setCurInventoryList(id, items = []) {
      this.curInventoryListId = id;
      if (!this.inventoryListMap.has(id)) {
        this.inventoryListMap.set(id, items);
      }
    },
  },
});

export default useConfigureStore;
