import { selectorFamily } from "recoil";
import apiCaller from "../core/api";

export const postState = selectorFamily({
  key: "postState",
  get: (id) => async () => {
    const item = await apiCaller(`posts/${id}`, "GET");
    return item.results ? item.results.data : null;
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const postsState = selectorFamily({
  key: "postsState",
  get:
    ({ user, search, status, page, page_size }) =>
    async () => {
      const item = await apiCaller("posts", "GET", {
        params: {
          user,
          search,
          status,
          page,
          pageSize: page_size,
        },
      });
      return item.results ? item.results.data : null;
    },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});
