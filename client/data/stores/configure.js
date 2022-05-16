import { defineStore } from "pinia";

const useConfigureStore = defineStore("configure", {
  state: () => {
    return {};
  },
  actions: {
    async registerConfigure(configure) {
      // must call $patch, replace directly is not work.
      this.$append(configure);
    },
  },
});

export default useConfigureStore;
