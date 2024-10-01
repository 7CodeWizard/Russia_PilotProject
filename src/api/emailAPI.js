import axios from "axios";
import endpoint from "../config/config";

const sendEmail = async (data) => {
  try {
    const response = await axios.post(`${endpoint}/sendEmail`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
