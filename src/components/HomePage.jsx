import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

const HomePage = () => {
  const movies = [
    { id: 1, name: "Inception", genre: "Sci-Fi", duration: 148 },
    { id: 2, name: "The Dark Knight", genre: "Action", duration: 152 },
    { id: 3, name: "Interstellar", genre: "Sci-Fi", duration: 169 },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* <NavBar /> */}
        <div className="container mx-auto p-4 flex-1">
          <Typography variant="h1" className="text-center mb-8">
            Movie Ticket Booking
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id} className="shadow-lg">
                <CardBody>
                  <Typography variant="h5" className="mb-2">
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" className="mb-4">
                    Genre: {movie.genre}
                  </Typography>
                  <Typography variant="body2" className="mb-4">
                    Duration: {movie.duration} minutes
                  </Typography>
                </CardBody>
                <CardFooter className="text-center">
                  <Button color="blue" size="lg">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
