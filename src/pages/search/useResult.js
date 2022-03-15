import { ref, unref, watch } from "vue";
// import useSearchStore from "../../data/stores/search";
import { getSearchListGenerater } from "../../models/search";

export function useResult(key, searchText, count) {
  const result = ref([]);

  let searchListIterator;
  // resetGenerator(key, unref(searchText), count);
  watch(searchText, (text, preText) => resetGenerator(key, text, count));

  let resData;
  function fetchResult() {
    if (!searchListIterator) {
      resetGenerator(key, unref(searchText), count);
    }

    if (!resData || resData.state !== "end") {
      searchListIterator.next().then((res) => {
        resData = res.data;
        result.value.push(resData.data);
        return res;
      });
    }

    return Promise.resolve({ data: { state: "end" } });
  }

  function resetGenerator(key, query, count = 10) {
    if (searchListIterator) {
      searchListIterator.close();
    }
    searchListIterator = getSearchListGenerater(key, query, count);
  }

  return {
    result,
    fetchResult,
  };
}
