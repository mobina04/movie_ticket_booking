import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { fetchMovies } from "../api";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const GenresPage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchMovies();
        const groupedMovies = movies.reduce((acc, movie) => {
          if (!acc[movie.genre]) {
            acc[movie.genre] = [];
          }
          acc[movie.genre].push(movie);
          return acc;
        }, {});

        console.log("Grouped movies by genre:", groupedMovies); // Log grouped movies
        setMoviesByGenre(groupedMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
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

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              {genre}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moviesByGenre[genre].map((movie) => (
                <Card key={movie._id} className="shadow-lg">
                  <CardHeader color="gray" className="relative h-56 m-3">
                    <img
                      src="https://cinemaone.net/images/movie_placeholder.png"
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" className="mb-2">
                      {movie.title}
                    </Typography>
                    <Typography variant="paragraph" className="mb-2">
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
