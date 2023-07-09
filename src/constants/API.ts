import axios from "axios";

export const API_KEY = "ba498958695c7044ab54153ece8dea66";
export const API_TOKEN =
  "ATTA91bfef0b4b5f35cac541a422c476ad83705b5fee5a44556df11b9c5837c6f47d0A6BEE4E";

export const requester = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: API_KEY,
    token: API_TOKEN,
  },
});
