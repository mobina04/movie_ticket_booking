import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api";

// Fetch all movies from the server
export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

// Sign up a new user
export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Log in an admin
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in as admin:", error);
    return null;
  }
};

// Sign up a new admin
export const signupAdmin = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up as admin:", error);
    return null;
  }
};

// Fetch all screens from the server
export const fetchScreens = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-screens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching screens:", error);
    return [];
  }
};

// Fetch screens by movie ID
export const fetchScreensByMovieId = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/screens`, {
      params: { movie_id: movieId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching screens:", error);
    return [];
  }
};

// Fetch all rooms from the server
export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

// Fetch seats by screen ID
export const fetchSeatsByScreenId = async (screenId) => {
  try {
    const response = await axios.get(`${API_URL}/seats?screen_id=${screenId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

// Fetch bookings by user ID
export const fetchBookingsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Add a new movie
export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    return null;
  }
};
