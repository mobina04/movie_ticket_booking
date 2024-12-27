# Movie Ticket Booking

## Overview

This project is a movie ticket booking application that allows users to sign up, log in, book tickets, and view their bookings. Admins can also log in to add movies.

## Features

- User sign-up and login
- Admin sign-up and login
- Book movie tickets
- View user bookings
- Admin profile panel to add movies
- Real-time seat availability updates

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Socket.IO
- Material Tailwind

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB

### Steps to Run the Project

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/movie_ticket_booking.git
   cd movie_ticket_booking
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up MongoDB**

   - Create a MongoDB database and collection.
   - Update the MongoDB connection string in `src/server.js` with your MongoDB URI.

4. **Start the server**

   ```sh
   node src/server.js
   ```

5. **Start the client**
   ```sh
   npm start
   ```

## Project Structure

### Client

- `public` - Public assets and index.html
- `src`
  - `components` - React components
    - `AddMoviePage.jsx` - Page for adding new movies
    - `AdminProfilePage.jsx` - Admin profile panel page
    - `BookingPage.jsx` - Page for booking tickets
    - `ConfirmationPage.jsx` - Confirmation page for bookings
    - `GenresPage.jsx` - Page for viewing genres
    - `HomePage.jsx` - Home page of the application
    - `LoginPage.jsx` - User login page
    - `MyBookingsPage.jsx` - Page for viewing user bookings
    - `NavBar.jsx` - Navigation bar component
    - `NavList.jsx` - List of navigation items
    - `RoomsPage.jsx` - Page for viewing rooms
    - `SeatsSelectionPage.jsx` - Page for selecting seats
    - `Sidebar.jsx` - Sidebar component
    - `SignupPage.jsx` - User signup page
  - `App.js` - Main application component
  - `index.js` - Entry point for the React application
  - `api.js` - API functions

### Server

- `src/server.js` - Main server file

## Real-time Seat Availability

The application uses Socket.IO to provide real-time updates for seat availability. When a user books seats, the updates are sent to all other users on the same page.

## Example Objects

### Movie Object

```json
{
  "_id": "675aceb1ffd3aaa0ceda123b",
  "title": "The Shawshank Redemption",
  "genre": "Drama",
  "duration": 142,
  "admin_id": "6767d1b3dff10638d3ca7fa4",
  "image_link": "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMG..."
}
```
https://github.com/mobina04/movie_ticket_booking
