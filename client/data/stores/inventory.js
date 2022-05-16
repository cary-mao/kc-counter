import { defineStore } from "pinia";

const useInventoryStore = defineStore("inventory", {
  state: () => {
    return {
      curInventoryListId: null,
      inventoryListMap: new Map(),
      inventoryLists: [],
      displayedItems: [],
    };
  },
  actions: {
    setInventoryLists(lists) {
      this.inventoryLists = lists;
    },
    setCurInventoryList(id, items = []) {
      this.curInventoryListId = id;
      if (!this.inventoryListMap.has(id)) {
        this.inventoryListMap.set(id, items);
      }
    },
  },
});

export default useInventoryStore;
