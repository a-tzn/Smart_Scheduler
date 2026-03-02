import axios from "axios";

const API= axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const loginAcc= (data) =>
    API.post("/login/",data);

export const createAcc= (data) =>
    API.post("/create/",data);

export default API

//api.js