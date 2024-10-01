import axios from "axios"
import endpoint from "../config/config"


const getFactorys = async () => {
    try {
        let response = await axios.get(`${endpoint}/factorys`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getTopFactorys = async () => {
    try {
        let response = await axios.get(`${endpoint}/factorys/top`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const insertFactory = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/factorys`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateFactory = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/factorys/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteFactory = async (_id) => {
    try {
        let response = await axios.delete(`${endpoint}/factorys/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export { getFactorys, insertFactory, deleteFactory, getTopFactorys, updateFactory }