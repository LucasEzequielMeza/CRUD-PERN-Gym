import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Enable cookies for cross-domain requests
})

export default client