import axios from "axios"
import endpoint from "../config/config"


const getTeam = async () => {
  try {
    let response = await axios.get(`${endpoint}/team`)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

const insertTeam = async (formdata) => {
  try {
    let response = await axios.post(`${endpoint}/team`, formdata)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

export { getTeam, insertTeam }