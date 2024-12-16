import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api";

export function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signupUser(name, email, password);
    if (response && response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } else {
      setError(response.message || "Error during signup");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card color="transparent" shadow={false} className="p-8">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSignup}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Log In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignupPage;
