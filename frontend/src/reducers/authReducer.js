import { getAuth, setAuth } from "../core/storage";
import { atom, selector } from "recoil";

export const authStateAtom = atom({
  key: "authStateAtom",
  default: getAuth(),
});

export const authState = selector({
  key: "authState",
  get: ({ get }) => get(authStateAtom),
  set: ({ set }, newValue) => {
    set(authStateAtom, newValue);
    setAuth(newValue);
  },
});

export const accessUserState = selector({
  key: "accessUserState",
  get: ({ get }) => get(authStateAtom)?.user,
});

export const accessTokenState = selector({
  key: "accessTokenState",
  get: ({ get }) => get(authStateAtom)?.accessToken,
});
