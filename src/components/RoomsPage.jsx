import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { fetchScreens, fetchRooms, fetchMovies } from "../api";
import NavBar from "./NavBar";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const roomsData = await fetchRooms();
        const screensData = await fetchScreens();
        const moviesData = await fetchMovies();

        console.log("Fetched roomsData:", roomsData); // Log fetched roomsData
        console.log("Fetched screensData:", screensData); // Log fetched screensData
        console.log("Fetched moviesData:", moviesData); // Log fetched moviesData

        setRooms(roomsData);
        setScreens(screensData);
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h4" color="blue-gray">
          Loading...
        </Typography>
      </div>
    );
  }

  // Sort screens by the nearest screening time
  const sortedScreens = screens.sort(
    (a, b) => new Date(a.screening_time) - new Date(b.screening_time)
  );

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        {rooms.map((room) => (
          <div key={room._id} className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              {room.room_name}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedScreens
                .filter((screen) => screen.room_id === room._id)
                .map((screen) => {
                  const movie = movies.find((m) => m._id === screen.movie_id);
                  return (
                    <Card key={screen._id} className="shadow-lg">
                      <CardHeader color="gray" className="relative h-56 m-3">
                        <img
                          src="https://cinemaone.net/images/movie_placeholder.png"
                          alt={movie ? movie.title : "Movie"}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography variant="h5" className="mb-2">
                          {movie ? movie.title : "Movie"}
                        </Typography>
                        <Typography variant="paragraph" className="mb-2">
                          Screening Time:{" "}
                          {new Date(screen.screening_time).toLocaleString()}
                        </Typography>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Link to={`/booking/${movie._id}`}>
                          <Button color="gray" size="lg" className="w-full">
                            Book Now
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
