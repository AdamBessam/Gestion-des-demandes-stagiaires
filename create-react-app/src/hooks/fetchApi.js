import axios from 'axios';

const fetchApi = axios.create({
  baseURL: "http://localhost:3001/api",
});



export { fetchApi };
