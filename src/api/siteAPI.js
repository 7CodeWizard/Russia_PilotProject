import axios from "axios"
import endpoint from "../config/config"


const getSite = async () => {
    try {
        let response = await axios.get(`${endpoint}/sites`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getsixSite = async () => {
    try {
        let response = await axios.get(`${endpoint}/sites/six`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getSiteById = async (id) => {
    try {
        let response = await axios.get(`${endpoint}/sites/${id}`);
        return await response.data;
    } catch (err) {
        console.log('Error fetching case by ID:', err);
    }
};

const insertSite = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/sites`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateSite = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/sites/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteSite = async (_id) => {
    try {
        let response = await axios.delete(`${endpoint}/sites/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export { getSite, insertSite, deleteSite, getsixSite, getSiteById, updateSite }