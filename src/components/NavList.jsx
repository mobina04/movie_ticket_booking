import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NavList = () => {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/genres"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Genres
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/rooms"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Rooms
        </Link>
      </Typography>
    </ul>
  );
};

export default NavList;
