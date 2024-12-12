const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mobinamohammadimm46:mm246810@cluster0.1qxwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  duration: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

app.get("/api/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
