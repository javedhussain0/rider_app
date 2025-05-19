import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo/Logo.png";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponents";
import Footer from "../components/Footer";

// Styled Components
const Container = styled.div`
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1.5rem 0;
  color: #333;
`;

const SplitLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  flex: 1;
  min-width: 300px;
`;

const MapWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #0077ff;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #005fcc;
  }
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const VehicleCard = styled.div`
  background: #f1f1f1;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MiniNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const LogoImg = styled.img`
  height: 40px;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;

  li {
    font-weight: bold;
    cursor: pointer;
  }
`;

// Navigation
const MiniNav = () => {
  const navigate = useNavigate();
  return (
    <MiniNavContainer>
      <LogoImg src={Logo} alt="logo" />
      <NavList>
        <li onClick={() => navigate()}>Ride</li>
        <li>Rental</li>
      </NavList>
    </MiniNavContainer>
  );
};

// Main Component
export default function RiderInfo() {
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    drop: "",
    vehicleType: "Car",
  });

  const [vehicles] = useState([
    { id: 1, type: "Car", name: "Toyota Prius", model: "2020", rate: "$15/hr" },
    { id: 2, type: "Car", name: "Honda Civic", model: "2022", rate: "$18/hr" },
    { id: 3, type: "Bike", name: "Yamaha FZ", model: "2021", rate: "$8/hr" },
    { id: 4, type: "Bike", name: "Royal Enfield", model: "2020", rate: "$10/hr" },
  ]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(`Booking confirmed! ${result.message}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while booking.");
    }
  };

  return (
    <Container>
      <MiniNav />
      <Title>Book a Ride</Title>
      <SplitLayout>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="pickup"
              placeholder="Pickup Location"
              value={formData.pickup}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="drop"
              placeholder="Drop Location"
              value={formData.drop}
              onChange={handleChange}
              required
            />
            <Select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </Select>
            <Button type="submit">Book Ride</Button>
          </Form>
        </FormWrapper>

        <MapWrapper>
          <MapComponent />
        </MapWrapper>
      </SplitLayout>

      <Title>Available Vehicles</Title>
      <VehicleGrid>
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id}>
            <h4>{vehicle.name} ({vehicle.type})</h4>
            <p>Model: {vehicle.model}</p>
            <p>Rate: {vehicle.rate}</p>
          </VehicleCard>
        ))}
      </VehicleGrid>

      <Footer />
    </Container>
  );
}
