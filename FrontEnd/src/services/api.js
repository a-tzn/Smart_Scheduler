import axios from "axios";

const API= axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const loginAcc= (data) =>
    API.post("/login/",data);

export const createAcc= (data) =>
    API.post("/create/",data);

export const createTask= (account_id, data) =>
    API.post(`/create_task/${account_id}/`, data);

export const updateTask = (task_id, data) =>
    API.put(`/update_task/${task_id}`, data);

export const getTasks= (account_id) =>
    API.get(`/tasks/${account_id}/`)

export const deleteTask= (task_id) =>
    API.delete(`/delete_task/${task_id}/`)

export default API

//api.js