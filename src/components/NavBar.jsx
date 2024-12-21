import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Avatar,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  FilmIcon,
  PowerIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
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

  const profileMenuItems = [
    {
      label: "My Bookings",
      icon: TicketIcon,
      action: () => navigate("/bookings"), // مسیر صفحه رزرو‌ها
    },
    {
      label: "Log Out",
      icon: PowerIcon,
      action: handleLogout,
    },
  ];

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center mr-4 cursor-pointer">
          <FilmIcon className="h-6 w-6 mr-2" />
          <Typography as="a" href="/" className="py-1.5 font-medium text-2xl">
            Movie Ticket Booking
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex items-center gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium mr-2"
              >
                {user.name}
              </Typography>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center rounded-full p-0"
                  >
                    <Avatar
                      variant="circular"
                      size="md"
                      alt="User Avatar"
                      withBorder={true}
                      color="blue-gray"
                      className="p-0.5"
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="p-1">
                  {profileMenuItems.map(({ label, icon, action }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                      <MenuItem
                        key={label}
                        onClick={action}
                        className={`flex items-center gap-2 rounded ${
                          isLastItem
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                        }`}
                      >
                        {React.createElement(icon, {
                          className: `h-4 w-4 ${
                            isLastItem ? "text-red-500" : ""
                          }`,
                          strokeWidth: 2,
                        })}
                        <Typography
                          as="span"
                          variant="small"
                          className="font-normal"
                          color={isLastItem ? "red" : "inherit"}
                        >
                          {label}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
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
