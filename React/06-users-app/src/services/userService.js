import axios from "axios";
import userApi from "../apis/userApi.js";

const BASE_URL = '';

export const findAll = async () => {
    try {
        const response = await userApi.get(BASE_URL);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const save = async ({ username, password, email, admin }) => {
    try {
        return await userApi.post(BASE_URL, {username, password, email, admin});
    } catch (err) {
        throw err;
    }
};

export const update = async ({ id, username, email, admin }) => {
    try {
        return await userApi.put(`${BASE_URL}/${id}`, {username, email, admin});
    } catch (err) {
        throw err;
    }
};

export const remove = async (id) => {
    try {
        await userApi.delete(`${BASE_URL}/${id}`);
    } catch (err) {
        throw err
    }
};