import axios from "axios";

const BASE_URL = 'http://localhost:9000/users';

export const findAll = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const save = async ({ username, password, email }) => {
    try {
        return await axios.post(BASE_URL, {username, password, email});
    } catch (err) {
        throw err;
    }
};

export const update = async ({ id, username, email }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {username, email});
    } catch (err) {
        throw err;
    }
};

export const remove = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (err) {
        console.log(err);
    }
};