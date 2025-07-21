import axios from "axios";

const API_URL = "http://localhost:5000/api/resources";

// Get all resources
export const getAllResources = () => axios.get(API_URL);

// Upload new resource
export const uploadResource = (data) => axios.post(API_URL, data);

// Delete a resource
export const deleteResource = (id) => axios.delete(`${API_URL}/${id}`);
