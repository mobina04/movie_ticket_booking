import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchScreensByMovieId, fetchRooms, fetchMovies } from "../api";
import NavBar from "./NavBar";

const BookingPage = () => {
  const { movieId } = useParams();
  const [screens, setScreens] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const screensData = await fetchScreensByMovieId(movieId);
        const roomsData = await fetchRooms();
        const movieData = await fetchMovies();
        const selectedMovie = movieData.find((m) => m._id === movieId);

        console.log("Fetched screensData:", screensData); // Log fetched screensData
        console.log("Fetched roomsData:", roomsData); // Log fetched roomsData
        console.log("Fetched movieData:", selectedMovie); // Log fetched movieData

        setScreens(screensData);
        setRooms(roomsData);
        setMovie(selectedMovie);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [movieId]);

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
        {movie && (
          <div className="mb-8">
            <Card>
              <CardHeader color="gray" className="relative h-56 m-5">
                <img
                  src={
                    movie.image_link ||
                    "https://cinemaone.net/images/movie_placeholder.png"
                  }
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {movie.title}
                </Typography>
                <Typography variant="paragraph" className="mb-2">
                  Genre: {movie.genre}
                </Typography>
                <Typography variant="paragraph" className="mb-2">
                  Duration: {movie.duration} minutes
                </Typography>
              </CardBody>
            </Card>
          </div>
        )}
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Available Screenings
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screens.map((screen) => {
            const room = rooms.find((room) => room._id === screen.room_id);
            return (
              <Card key={screen._id} className="shadow-lg p-3">
                <CardBody>
                  <Typography variant="h5" className="mb-2">
                    Room: {room ? room.room_name : "N/A"}
                  </Typography>
                  <Typography variant="paragraph" className="mb-4">
                    Capacity: {room ? room.capacity : "N/A"}
                  </Typography>
                  <Typography variant="paragraph" className="mb-4">
                    Screening Time:{" "}
                    {new Date(screen.screening_time).toLocaleString()}
                  </Typography>
                </CardBody>
                <div className="text-center">
                  <Button
                    color="gray"
                    size="lg"
                    className="w-full"
                    onClick={() =>
                      navigate(`/seats-selection/${screen._id}`, {
                        state: {
                          movieTitle: movie.title,
                          roomName: room ? room.room_name : "N/A",
                          screeningTime: screen.screening_time,
                        },
                      })
                    }
                  >
                    Select
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
