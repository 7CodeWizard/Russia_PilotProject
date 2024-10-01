import axios from "axios"
import endpoint from "../config/config"


const getRental = async () => {
  try {
    let response = await axios.get(`${endpoint}/rental`)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

const insertRental = async (formdata) => {
  try {
    let response = await axios.post(`${endpoint}/rental`, formdata)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

export { getRental, insertRental }