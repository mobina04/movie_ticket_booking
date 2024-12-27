import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { fetchMovies } from "../api";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const AdminProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }

    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h4" color="blue-gray">
          Please log in as admin to view this page.
        </Typography>
      </div>
    );
  }

  const adminMovies = movies.filter((movie) => movie.admin_id === admin._id);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Card className="mb-8">
          <CardBody className="text-center">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt="Admin Avatar"
              size="xl"
              className="mx-auto mb-4"
            />
            <Typography variant="h4" color="blue-gray">
              {admin.name}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-4">
              {admin.email}
            </Typography>
            <Button
              variant="gradient"
              color="gray"
              size="lg"
              onClick={() => navigate("/add-movie")}
            >
              Add Movie
            </Button>
          </CardBody>
        </Card>
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Movies Added by You
        </Typography>
        {loading ? (
          <Typography variant="h6" color="blue-gray" className="text-center">
            Loading...
          </Typography>
        ) : adminMovies.length === 0 ? (
          <Typography variant="h6" color="blue-gray" className="text-center">
            No movies added yet.
          </Typography>
        ) : (
          adminMovies.map((movie) => (
            <Card key={movie._id} className="mb-4">
              <CardBody>
                <Typography variant="h6" color="blue-gray">
                  Title: {movie.title}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Genre: {movie.genre}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  Duration: {movie.duration} minutes
                </Typography>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
