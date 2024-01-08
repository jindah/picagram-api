// Axios Configuration

// Importing Axios library for making HTTP requests
import axios from "axios";

// Setting up default configurations for all Axios requests
axios.defaults.baseURL = "https://picagram-ac5efc799683.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Creating custom Axios instances for request-related and response-related operations
export const axiosReq = axios.create(); // Used for making requests
export const axiosRes = axios.create(); // Used for handling responses
