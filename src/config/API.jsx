import axios from "axios";

export const API = axios.create({
  baseURL: "https://employees-datas.herokuapp.com/api/v1/",
});
