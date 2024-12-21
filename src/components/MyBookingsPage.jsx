import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import {
  fetchBookingsByUserId,
  fetchScreens,
  fetchMovies,
  fetchSeatsByScreenId,
} from "../api";
import NavBar from "./NavBar";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getBookings = async () => {
      if (user) {
        try {
          const bookingsData = await fetchBookingsByUserId(user._id);
          const screensData = await fetchScreens();
          const moviesData = await fetchMovies();
          const seatsData = await Promise.all(
            bookingsData.map((booking) =>
              fetchSeatsByScreenId(booking.screening_id)
            )
          );

          const enrichedBookings = bookingsData.map((booking) => {
            const screen = screensData.find(
              (screen) => screen._id === booking.screening_id
            );
            const movie = moviesData.find(
              (movie) => movie._id === screen.movie_id
            );
            const seat = seatsData
              .flat()
              .find((seat) => seat._id === booking.seat_id);
            return { ...booking, movie, screen, seat };
          });

          setBookings(enrichedBookings);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    getBookings();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Card className="mb-8">
          <CardBody className="text-center">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt="User Avatar"
              size="xl"
              className="mx-auto mb-4"
            />
            <Typography variant="h4" color="blue-gray">
              {user.name}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-8">
              {user.email}
            </Typography>
          </CardBody>
        </Card>
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          My Bookings
        </Typography>
        {loading ? (
          <Typography variant="h6" color="blue-gray" className="text-center">
            Loading...
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card key={booking._id} className="mb-4">
              <CardBody>
                <Typography variant="h6" color="blue-gray">
                  Movie: {booking.movie.title}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Screen: {booking.screen.screening_time}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Seat: {booking.seat.seat_number}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Booking Time:{" "}
                  {new Date(booking.booking_time).toLocaleString()}
                </Typography>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
