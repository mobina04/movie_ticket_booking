const express = require("express"); // Import express framework
const mongoose = require("mongoose"); // Import mongoose for MongoDB
const cors = require("cors"); // Import cors for handling cross-origin requests
const http = require("http"); // Import http to create a server
const { Server } = require("socket.io"); // Import Socket.IO for real-time features

const app = express(); // Create an express application
const server = http.createServer(app); // Create an HTTP server

// Set up Socket.IO to work with the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mobinamohammadimm46:mm246810@cluster0.1qxwr.mongodb.net/ticket?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB")) // Log success message
  .catch((err) => console.error("Could not connect to MongoDB", err)); // Log error message

// Define schemas for MongoDB collections
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  duration: Number,
  admin_id: mongoose.Schema.Types.ObjectId,
  image_link: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const adminSchema = new mongoose.Schema({
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

const bookingSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  screening_id: mongoose.Schema.Types.ObjectId,
  seat_id: mongoose.Schema.Types.ObjectId,
  booking_time: { type: Date, default: Date.now },
});

// Create models for collections using schemas
const Movie = mongoose.model("Movie", movieSchema, "movie");
const User = mongoose.model("User", userSchema, "user");
const Screen = mongoose.model("Screen", screenSchema, "screen");
const Room = mongoose.model("Room", roomSchema, "room");
const Seat = mongoose.model("Seat", seatSchema, "seat");
const Booking = mongoose.model("Booking", bookingSchema, "booking");
const Admin = mongoose.model("Admin", adminSchema, "admin");

// Route to get all movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies); // Send movies as JSON response
  } catch (error) {
    res.status(500).send("Error fetching movies"); // Handle error
  }
});

// Route to add a new movie
app.post("/api/movies", async (req, res) => {
  const { title, genre, duration, image_link, admin_id } = req.body;
  try {
    const newMovie = new Movie({
      title,
      genre,
      duration,
      image_link,
      admin_id,
    });
    await newMovie.save(); // Save the new movie to the database
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).send("Error adding movie"); // Handle error
  }
});

// Route for user login
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
    res.status(500).send("Error during login"); // Handle error
  }
});

// Route for user signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save(); // Save the new user to the database
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).send("Error during signup"); // Handle error
  }
});

// Admin routes
// Route for admin login
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      res.json({ message: "Login successful", admin });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send("Error during admin login"); // Handle error
  }
});

// Route for admin signup
app.post("/api/admin/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save(); // Save the new admin to the database
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error during admin signup:", error);
    res.status(500).send("Error during admin signup"); // Handle error
  }
});

// Route to get all screens
app.get("/api/all-screens", async (req, res) => {
  try {
    const screens = await Screen.find();
    res.json(screens); // Send screens as JSON response
  } catch (error) {
    res.status(500).send("Error fetching screens"); // Handle error
  }
});

// Route to get screens by movie ID
app.get("/api/screens", async (req, res) => {
  const { movie_id } = req.query;
  try {
    const screens = await Screen.find({ movie_id });
    res.json(screens); // Send screens as JSON response
  } catch (error) {
    res.status(500).send("Error fetching screens"); // Handle error
  }
});

// Route to get all rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms); // Send rooms as JSON response
  } catch (error) {
    res.status(500).send("Error fetching rooms"); // Handle error
  }
});

// Route to get seats by screen ID
app.get("/api/seats", async (req, res) => {
  const { screen_id } = req.query;
  try {
    const seats = await Seat.find({ screen_id });
    res.json(seats);
  } catch (error) {
    res.status(500).send("Error fetching seats");
  }
});

// Route to create bookings
app.post("/api/bookings", async (req, res) => {
  const { user_id, screening_id, seat_ids } = req.body;
  try {
    const bookings = seat_ids.map((seat_id) => ({
      user_id,
      screening_id,
      seat_id,
      booking_time: new Date(),
    }));

    await Booking.insertMany(bookings);
    await Seat.updateMany(
      { _id: { $in: seat_ids } },
      { $set: { is_available: false } }
    );

    io.emit("seatsUpdated", { screen_id: screening_id }); // Emit an event to update the seats for the specific screen

    res
      .status(201)
      .json({ message: "Bookings created and seats updated successfully" });
  } catch (error) {
    res.status(500).send("Error creating bookings");
  }
});

// Route to get bookings by user ID
app.get("/api/bookings", async (req, res) => {
  const { user_id } = req.query;
  try {
    const bookings = await Booking.find({ user_id });
    res.json(bookings);
  } catch (error) {
    res.status(500).send("Error fetching bookings");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
