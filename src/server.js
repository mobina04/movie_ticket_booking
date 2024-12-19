const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://mobinamohammadimm46:mm246810@cluster0.1qxwr.mongodb.net/ticket?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  duration: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const screenSchema = new mongoose.Schema({
  movie_id: mongoose.Schema.Types.ObjectId,
  room_id: mongoose.Schema.Types.ObjectId,
  screening_time: Date,
});

const roomSchema = new mongoose.Schema({ room_name: String, capacity: Number });

const seatSchema = new mongoose.Schema({
  seat_number: String,
  is_available: Boolean,
  screen_id: mongoose.Schema.Types.ObjectId,
});

const Movie = mongoose.model("Movie", movieSchema, "movie");
const User = mongoose.model("User", userSchema, "user");
const Screen = mongoose.model("Screen", screenSchema, "screen");
const Room = mongoose.model("Room", roomSchema, "room");
const Seat = mongoose.model("Seat", seatSchema, "seat");

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).send("Error fetching movies");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).send("Error during signup");
  }
});

// برای گرفتن تمام نمایش‌ها
app.get("/api/all-screens", async (req, res) => {
  try {
    const screens = await Screen.find();
    res.json(screens);
  } catch (error) {
    res.status(500).send("Error fetching screens");
  }
});

// برای گرفتن نمایش‌ها براساس شناسه فیلم (movie_id)
app.get("/api/screens", async (req, res) => {
  const { movie_id } = req.query;
  try {
    const screens = await Screen.find({ movie_id });
    res.json(screens);
  } catch (error) {
    res.status(500).send("Error fetching screens");
  }
});

app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).send("Error fetching rooms");
  }
});

app.get("/api/seats", async (req, res) => {
  const { screen_id } = req.query;
  try {
    const seats = await Seat.find({ screen_id });
    res.json(seats);
  } catch (error) {
    res.status(500).send("Error fetching seats");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
