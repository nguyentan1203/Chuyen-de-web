import { selectorFamily } from "recoil";
import apiCaller from "../core/api";

export const appliesState = selectorFamily({
  key: "appliesState",
  get:
    ({ page, page_size }) =>
    async () => {
      const item = await apiCaller("applies", "GET", {
        params: { page, pageSize: page_size },
      });
      return item.results ? item.results.data : null;
    },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});
