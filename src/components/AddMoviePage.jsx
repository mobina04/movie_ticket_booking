import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api"; // Assuming addMovie function is available in api.js
import NavBar from "./NavBar";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const AddMoviePage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!title || !genre || !duration || !imageLink) {
      alert("Please fill in all fields");
      return;
    }

    const newMovie = {
      title,
      genre,
      duration: Number(duration),
      image_link: imageLink,
      admin_id: admin._id,
    };

    const response = await addMovie(newMovie);
    if (response) {
      alert("Movie added successfully");
      navigate("/admin");
    } else {
      alert("Error adding movie");
    }
  };

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h4" color="blue-gray">
          Please log in as admin to view this page.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Card className="mb-8">
          <CardBody>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center mb-4"
            >
              Add New Movie
            </Typography>
            <form onSubmit={handleAddMovie}>
              <div className="mb-4">
                <Input
                  size="lg"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  size="lg"
                  label="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e)}
                >
                  {genres.map((genre) => (
                    <Option key={genre} value={genre}>
                      {genre}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <Input
                  size="lg"
                  type="number"
                  label="Duration (in minutes)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Input
                  size="lg"
                  label="Image Link"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </div>
              <Button type="submit" color="gray" size="lg" className="w-full">
                Add Movie
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddMoviePage;
