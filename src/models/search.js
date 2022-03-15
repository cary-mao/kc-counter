import { get as localGet } from "../data/local";
import { get as cloudGet } from "../data/cloud";
import useSearchStore from "../data/stores/search";

const store = useSearchStore();

export async function* getSearchListGenerater(key, query, count) {
  let end = false;
  let page = 1;
  while (!end) {
    const res = await cloudGet({
      url: `/api/search/list`,
      params: {
        type: key,
        q: query,
        page,
        count,
      },
    });

    const data = res.data;

    if (data.state === "end") {
      end = true;
    }

    yield res;
  }
}

export function getSearchHistory(key) {
  let history = localGet(`search_${key}`);
  if (history) {
    return Promise.resolve(history);
  }
  return cloudGet({
    url: "/api/search/history",
    params: {
      type: key,
    },
  });
}
