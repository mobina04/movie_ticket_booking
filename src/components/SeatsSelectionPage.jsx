import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchSeatsByScreenId } from "../api";
import NavBar from "./NavBar";

const SeatsSelectionPage = () => {
  const { screenId } = useParams();
  const location = useLocation();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const seatPrice = 10;
  const navigate = useNavigate();

  const { movieTitle, roomName, screeningTime } = location.state || {};

  useEffect(() => {
    const getSeats = async () => {
      try {
        const seatsData = await fetchSeatsByScreenId(screenId);
        console.log("Fetched seatsData:", seatsData); // Log fetched seatsData
        setSeats(seatsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    getSeats();
  }, [screenId]);

  const handleSeatClick = (seat) => {
    if (seat.is_available) {
      if (selectedSeats.includes(seat._id)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat._id));
      } else {
        setSelectedSeats([...selectedSeats, seat._id]);
      }
    }
  };

  const handleSubmitBooking = () => {
    console.log("Selected seats:", selectedSeats);
    navigate("/confirmation"); // هدایت به صفحه تاییدیه (می‌توانید این صفحه را ایجاد کنید)
  };

  const totalCost = selectedSeats.length * seatPrice;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h4" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        {movieTitle && roomName && screeningTime && (
          <div className="mb-8">
            <Card>
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {movieTitle}
                </Typography>
                <Typography variant="paragraph" className="mb-2">
                  Room: {roomName}
                </Typography>
                <Typography variant="paragraph" className="mb-2">
                  Date and Time: {new Date(screeningTime).toLocaleString()}
                </Typography>
              </CardBody>
            </Card>
          </div>
        )}
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Choose Your Seats
        </Typography>
        <div className="mb-4">
          <div className="border border-gray-500 rounded-lg p-2 mx-auto w-full max-w-lg text-center">
            [Screen]
          </div>
        </div>
        <div className="grid grid-cols-10 mb-4 gap-2">
          {seats.map((seat) => (
            <div
              key={seat._id}
              onClick={() => handleSeatClick(seat)}
              className={`p-2 text-center rounded-full cursor-pointer h-10 ${
                seat.is_available ? "bg-gray-400" : "bg-gray-950"
              } ${selectedSeats.includes(seat._id) ? "bg-gray-700" : ""}`}
            >
              <Typography variant="small" color="white">
                {seat.seat_number}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Total Cost: ${totalCost}
          </Typography>
          <Button color="gray" size="lg" onClick={handleSubmitBooking}>
            Submit Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatsSelectionPage;
