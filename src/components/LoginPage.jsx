import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginAdmin } from "../api";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (response && response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const response = await loginAdmin(email, password);
    if (response && response.admin) {
      localStorage.setItem("admin", JSON.stringify(response.admin));
      navigate("/admin");
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card color="transparent" shadow={false} className="p-8">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Log In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Welcome back! Enter your details to log in.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleLogin}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {error && (
              <Typography color="red" className="text-center">
                {error}
              </Typography>
            )}

            <Button type="submit" className="mt-6" fullWidth>
              Log In
            </Button>
            <Button
              type="button"
              color="gray"
              className="mt-2"
              fullWidth
              onClick={handleAdminLogin}
            >
              Log in as Admin
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-gray-900">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
