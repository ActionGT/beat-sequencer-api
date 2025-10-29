import axios from 'axios';

// Create an axios "instance" with a pre-configured base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Our backend URL
  withCredentials: true // Important for sending auth headers
});

export default apiClient;