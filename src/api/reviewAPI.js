import axios from "axios"
import endpoint from "../config/config"


const getReviews = async () => {
    try {
        let response = await axios.get(`${endpoint}/reviews`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const getReviewsBytype = async (reviewType) => {
    try {
        let response = await axios.get(`${endpoint}/reviewsBytype`, {
            params: {
                reviewType: reviewType,
            }
        })
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const insertReview = async (formdata) => {
    try {
        let response = await axios.post(`${endpoint}/reviews`, formdata)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

const updateReview = async (id, formdata) => {
    try {
        let response = await axios.put(`${endpoint}/reviews/${id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error updating record:', err);
    }
};

const deleteReview = async (_id) => {
    try {
        let response = await axios.delete(`${endpoint}/reviews/${_id}`)
        return await response.data
    } catch (err) {
        console.log(err)
    }
}

export { getReviews, insertReview, deleteReview, updateReview, getReviewsBytype }