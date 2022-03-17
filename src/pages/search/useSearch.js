import { ref } from "vue";
import { getSearchHistory } from "../../models/search";

export function useSearch(string = "") {
  const searchText = ref(string);
  const searchHistory = ref([]);
  const tipsFromHistory = ref([]);

  getSearchHistory().then(({ data }) => {
    searchHistory.value = data.data;
  });

  function handleSearch(value) {
    searchHistory.value.push(value);
  }

  function handleChange(value) {
    tipsFromHistory.value = searchHistory.value.filter(
      (historyText) => historyText.indexOf(value) >= 0
    );
  }

  function clearHistory() {
    searchHistory.value = [];
  }

  function removeHistory(index) {
    searchHistory.value.splice(index, 1);
  }

  return {
    searchText,
    searchHistory,
    tipsFromHistory,
    clearHistory,
    removeHistory,
    handleSearch,
    handleChange,
  };
}
