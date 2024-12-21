import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Card className="mt-8">
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Booking Confirmed!
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mb-8">
              Your booking was successful. Thank you for booking with us!
            </Typography>
            <Button color="gray" size="lg" onClick={handleGoHome}>
              Go to Home
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationPage;
