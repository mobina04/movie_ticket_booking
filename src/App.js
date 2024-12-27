import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import BookingPage from "./components/BookingPage";
import SeatsSelectionPage from "./components/SeatsSelectionPage";
import GenresPage from "./components/GenresPage";
import RoomsPage from "./components/RoomsPage";
import ConfirmationPage from "./components/ConfirmationPage";
import MyBookingsPage from "./components/MyBookingsPage";
import AdminProfilePage from "./components/AdminProfilePage";
import AddMoviePage from "./components/AddMoviePage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/booking/:movieId" element={<BookingPage />} />
          <Route
            path="/seats-selection/:screenId"
            element={<SeatsSelectionPage />}
          />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/admin" element={<AdminProfilePage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
