import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

// Ride service images
import ride from "../assets/ridePoster/ride.png";
import intercity from "../assets/ridePoster/intercity.png";
import rental from "../assets/ridePoster/rental.png";
import reserve from "../assets/ridePoster/reserve.png";

// Booking steps images
import laptop from "../assets/ridePoster/laptop.png";
import mobile from "../assets/ridePoster/mobile.png";
import car from "../assets/ridePoster/car.png";

const ServiceContainer = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailsButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
`;

const Root = styled("section")`
  padding: 64px 16px;
  text-align: center;
`;

const Heading = styled(Typography)`
  font-weight: 700;
  margin-bottom: 48px;
`;

const StepCard = styled(Box)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StepImage = styled("img")`
  width: 100%;
  display: block;
  object-fit: cover;
`;

const Content = styled(Box)`
  padding: 24px;

  h6 {
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const services = [
  {
    title: "Ride",
    description: "Go anywhere with CitiConnect. Request a ride, hop in, and go.",
    image: ride,
  },
  {
    title: "Reserve",
    description: "Reserve your ride in advance so you can relax on the day of your trip.",
    image: reserve,
  },
  {
    title: "Intercity",
    description: "Get convenient, affordable outstation cabs anytime at your door.",
    image: intercity,
  },
  {
    title: "Rentals",
    description: "Request a trip for a block of time and make multiple stops.",
    image: rental,
  },
];

const steps = [
  {
    number: 1,
    title: "Add your trip details",
    description: "Enter your pickup spot and destination, and check prices for your trip.",
    img: laptop,
  },
  {
    number: 2,
    title: "Pay easily",
    description:
      "Add your preferred payment method, then choose among the ride options available in your location.",
    img: mobile,
  },
  {
    number: 3,
    title: "Meet your driver",
    description:
      "CitiConnect will match you with a driver nearby, and you’ll get updates on your phone or computer about when to meet them.",
    img: car,
  },
];

const Poster = () => {
  const navigate = useNavigate();

  return (
    <>
      <ServiceContainer>
        {services.map((service, idx) => (
          <ServiceCard key={idx}>
            <div>
              <Title>{service.title}</Title>
              <Description>{service.description}</Description>
            </div>
            <CardFooter>
              <DetailsButton onClick={() => navigate("RiderInfo")}>Details</DetailsButton>
              <Image src={service.image} alt={service.title} />
            </CardFooter>
          </ServiceCard>
        ))}
      </ServiceContainer>

      <Root>
        <Heading
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: 700,
            color: "#333",
          }}
        >
          Book your trip on your phone or computer
        </Heading>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
        >
          {steps.map((step) => (
            <StepCard
              key={step.number}
              sx={{
                flex: "1 1 300px",
                maxWidth: "350px",
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <StepImage src={step.img} alt={step.title} />
              <Content>
                <Typography onClick={()=>navigate("/RiderInfo")} variant="h6" component="h3">
                  {step.number}. {step.title}
                </Typography>
                <Typography variant="body2">{step.description}</Typography>
              </Content>
            </StepCard>
          ))}
        </Box>
      </Root>
    </>
  );
};

export default Poster;
