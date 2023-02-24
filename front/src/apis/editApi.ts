import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080/edit',
  timeout: 30000
})

export default api;