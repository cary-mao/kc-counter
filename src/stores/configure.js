import { defineStore } from "pinia";
import { reactive } from "vue";

const useConfigureStore = defineStore("configure", {
  state: () => {
    return {};
  },
  actions: {
    registerConfigure(configure) {
      // must call $patch, replace directly is not work.
      this.$append(configure);
    },
  },
  getters: {
    say(state) {
      return `autoSave: ${state.autoSave}`;
    },
  },
});

export default useConfigureStore;
