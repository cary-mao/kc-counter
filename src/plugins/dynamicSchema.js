/**
 * Something is wrong when using 'storeToRefs' in pinia if state's schema is changed.
 * That is because the enumerable keys aren't copy from '$state'
 * github link
 * @link https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/storeToRefs.ts
 * local link
 * @link E:\\cary_mao\\kc-counter\\node_modules\\pinia\\dist\\pinia.esm-browser.js
 */
import { isRef, ref, toRaw } from "vue";

function dynamicSchema({ store, options }) {
  // toRaw: get the origin object from reative object
  // if not call 'toRaw', store[key] won't be ref and only the value of ref.
  store.$append = function (objOrFn) {
    store = toRaw(store);
    const nextState = toRaw(
      typeof objOrFn === "function" ? objOrFn() : objOrFn
    );
    for (let key in nextState) {
      if (!isRef(store[key])) {
        store[key] = ref(nextState[key]);
      }
    }
    store.$patch(nextState);
  };
}

export default dynamicSchema;
