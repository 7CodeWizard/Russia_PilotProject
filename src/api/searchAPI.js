import axios from "axios"
import endpoint from "../config/config"

const getSearchData = async (searchTerm) => {
  try {
    let response = await axios.post(`${endpoint}/getSearchData`, { searchTerm: searchTerm })
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

export { getSearchData }