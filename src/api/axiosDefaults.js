import axios from "axios";

axios.defaults.baseURL = "https://picagram-ac5efc799683.herokuapp.com/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;