import axios from "axios"
import endpoint from "../config/config"


const getEquips = async () => {
    try {
        let response = await axios.get(`${endpoint}/equipments`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getEquipsByType = async (equipmentType) => {
    try {
        let response = await axios.get(`${endpoint}/equipments/type`, {
            params: {
                equipmentType: equipmentType,
            }
        })
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const insertEquip = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/equipments`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateEquip = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/equipments/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteEquip = async (_id) => {
    try {
        let response = await axios.delete(`${endpoint}/equipments/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getEquipById = async (id) => {
    try {
        let response = await axios.get(`${endpoint}/equipments/${id}`);
        return await response.data;
    } catch (err) {
        console.log('Error fetching equipment by ID:', err);
    }
};

export { getEquips, insertEquip, deleteEquip, getEquipsByType, getEquipById, updateEquip }