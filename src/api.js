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

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

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

// گرفتن تمام نمایش‌ها
export const fetchScreens = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-screens`);
    return response.data;
  } catch (error) {
    console.error("Error fetching screens:", error);
    return [];
  }
};

// گرفتن نمایش‌ها براساس شناسه فیلم (movie_id)
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

export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export const fetchSeatsByScreenId = async (screenId) => {
  try {
    const response = await axios.get(`${API_URL}/seats?screen_id=${screenId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

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
