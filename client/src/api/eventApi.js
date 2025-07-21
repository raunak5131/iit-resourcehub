// client/src/api/eventApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const getAllEvents = () => axios.get(API_URL);
export const addEvent = (eventData) => axios.post(API_URL, eventData);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);
