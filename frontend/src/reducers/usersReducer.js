import { atom, selectorFamily } from "recoil";
import apiCaller from "../core/api";

export const forceLoadUserState = atom({
  key: "forceLoadUserState",
  default: {},
});

export const usersState = selectorFamily({
  key: "usersState",
  get:
    ({ page, page_size }) =>
    async ({ get }) => {
      get(forceLoadUserState);
      const item = await apiCaller("users", "GET", {
        params: {
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
