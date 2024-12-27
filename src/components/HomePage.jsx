import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { fetchMovies } from "../api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };

    getMovies();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <NavBar />
        <div className="container mx-auto p-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Card key={movie._id} className="shadow-lg">
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
                    <Typography variant="paragraph" className="mb-4">
                      Genre: {movie.genre}
                    </Typography>
                    <Typography variant="paragraph" className="mb-4">
                      Duration: {movie.duration} minutes
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
              ))
            ) : (
              <Typography variant="h6" className="text-center w-full">
                No movies found.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
