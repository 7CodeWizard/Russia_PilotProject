import axios from "axios"
import endpoint from "../config/config"


const getParticipant = async () => {
  try {
    let response = await axios.get(`${endpoint}/participant`)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

const getShowParticipant = async (num) => {
  try {
    let response = await axios.get(`${endpoint}/showparticipant`, {
      params: {
        participantNum: num
      }
    })
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

const insertParticipant = async (formdata) => {
  try {
    let response = await axios.post(`${endpoint}/participant`, formdata)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

const updateParticipant = async (id, formdata) => {
  try {
    let response = await axios.put(`${endpoint}/participant/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error updating record:', err);
  }
};

const deleteParticipant = async (_id) => {
  try {
    let response = await axios.delete(`${endpoint}/participant/${_id}`)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

export { getParticipant, insertParticipant, deleteParticipant, updateParticipant, getShowParticipant }