import useConfigureStore from "./data/stores/configure";
import { getConfigure } from "./models/configure";

async function load() {
  const store = useConfigureStore();
  getConfigure().then((configure) => store.registerConfigure(configure));
}

export default load;
