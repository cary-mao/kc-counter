import useConfigureStore from "./stores/configure";

// load configures
import { get as localGet } from "./data/local";
import { get as cloudGet } from "./data/cloud";

async function load() {
  const store = useConfigureStore();
  let configure = localGet("configure");
  if (configure) {
    // store.$state = configure;
    store.registerConfigure(configure);
    return Promise.resolve(configure);
  } else {
    // load remote data
    return cloudGet("configure").then((res) => {
      configure = res.data.data;
      store.registerConfigure(configure);
      return configure;
    });
  }
}

export default load;
