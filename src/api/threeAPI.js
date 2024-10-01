import axios from "axios"
import endpoint from "../config/config"


const getThrees = async () => {
    try {
        let response = await axios.get(`${endpoint}/threes`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const insertThree = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/threes`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateThree = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/threes/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteThree = async (_id) => {
    try {
        let response = await axios.delete(`${endpoint}/threes/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export { getThrees, insertThree, deleteThree, updateThree }