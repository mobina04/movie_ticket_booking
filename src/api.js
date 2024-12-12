import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export const fetchScreens = async () => {
  try {
    const response = await axios.get(`${API_URL}/screens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching screens:", error);
    return [];
  }
};

export const fetchSeats = async () => {
  try {
    const response = await axios.get(`${API_URL}/seats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
