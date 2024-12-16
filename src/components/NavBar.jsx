import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // بارگذاری کاربر از Local Storage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    // حذف کاربر از Local Storage
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // هدایت به صفحه اصلی پس از خروج
  };

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium text-2xl"
        >
          Movie Ticket Booking
        </Typography>
        <div className="flex items-center gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-2">
              <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt="avatar"
                size="sm"
                className="rounded-full"
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {user.name}
              </Typography>
              <Button variant="outlined" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
