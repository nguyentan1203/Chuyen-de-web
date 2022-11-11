import { STORAGE_AUTH } from "../const/storage";

const getCookie = (cName) => {
  const name = `${cName}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const setCookie = (cName, cValue, expiresDays = 365) => {
  const d = new Date();
  d.setTime(d.getTime() + expiresDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cName}=${cValue};${expires};path=/`;
};

const processInput = (input) => {
  if (input instanceof Date) {
    return JSON.stringify(input.getTime());
  }
  return JSON.stringify(input);
};

const processOutput = (output) => {
  if (output === null) {
    return output;
  }
  let result;
  try {
    result = JSON.parse(output);
  } catch (e) {
    result = output;
  }
  return result;
};

export const getAuth = () => {
  const result = getCookie(STORAGE_AUTH);
  return processOutput(result);
};

export const setAuth = (resource = {}) => {
  const result = processInput(resource);
  setCookie(STORAGE_AUTH, result);
};
