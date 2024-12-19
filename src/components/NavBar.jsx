import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, FilmIcon } from "@heroicons/react/24/outline";
import NavList from "./NavList";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () =>
      window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleWindowResize);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center mr-4 cursor-pointer">
          {" "}
          <FilmIcon className="h-6 w-6 mr-2" />{" "}
          <Typography as="a" href="/" className="py-1.5 font-medium text-2xl">
            {" "}
            Movie Ticket Booking{" "}
          </Typography>{" "}
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
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
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
