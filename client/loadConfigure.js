import useConfigureStore from "./data/stores/configure";
import { getConfigure } from "./models/configure";
import Darkmode from 'darkmode-js'
import cache from './data/cache'

cache.darkMode = new Darkmode()

function load() {
  const store = useConfigureStore();
  return new Promise((resolve, reject) => {
    getConfigure().then((configure) => {
      console.log('register')
      store.registerConfigure(configure).then(() => {
        if (configure.mode === 'dark') {
          cache.darkMode.showWidget()
        }
        resolve()
      })

    });
  })
}

export default load;
