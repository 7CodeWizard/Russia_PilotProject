import axios from "axios"
import endpoint from "../config/config"


const getCases = async () => {
    try {
        let response = await axios.get(`${endpoint}/cases`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getCaseById = async (id) => {
    try {
        let response = await axios.get(`${endpoint}/cases/${id}`);
        return await response.data;
    } catch (err) {
        console.log('Error fetching case by ID:', err);
    }
};

const insertCase = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/cases`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateCase = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/cases/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteCase = async (_id) => {
    console.log(_id)
    try {
        let response = await axios.delete(`${endpoint}/cases/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const insertSolution = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/cases/solution`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getCasesWithCheckbox = async (checkboxValue, num) => {
    try {
        let response = await axios.get(`${endpoint}/cases/checkbox`, {
            params: {
                checkboxValue: checkboxValue,
                casesNum: num
            }
        });
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

const getCasesByType = async (caseType) => {
    try {
        let response = await axios.get(`${endpoint}/cases/type`, {
            params: {
                caseType: caseType,
            }
        });
        return await response.data;
    } catch (err) {
        console.log(err);
    }
};

export { getCases, insertCase, deleteCase, insertSolution, updateCase, getCasesWithCheckbox, getCasesByType, getCaseById }