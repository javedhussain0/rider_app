import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo/Logo.png";
import MapComponent from "../components/MapComponents";
import Footer from "../components/Footer";
import Home from "../pages/Home"

const Container = styled.div`
  margin: auto;
  background: linear-gradient(to bottom right, #f2f4f8, #e9f0ff);
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
  height: 400px;
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

const RentalForm = styled.div`
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
  flex: 1;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fcc;
  }
`;

const GetStartedButton = styled(Button)`
  background-color: #4CAF50;
  margin-top: 1rem;
  
  &:hover {
    background-color: #3e8e41;
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
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid #0077ff" : "none")};
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 119, 255, 0.3);
  }
`;

const SmallButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005fcc;
  }
`;

const MiniNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    padding: 0.5rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    &.active {
      background-color: #0077ff;
      color: white;
    }

    &:hover {
      background-color: #f0f7ff;
    }
  }
`;

const MiniNav = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <MiniNavContainer>
      <LogoImg src={Logo} alt="logo" />
      <NavList>
        <li onClick={()=>navigate("/")}
        >
          Home
        </li>
        <li 
          className={activeTab === 'ride' ? 'active' : ''}
          onClick={() => setActiveTab('ride')}
        >
          Ride
        </li>
        <li 
          className={activeTab === 'rental' ? 'active' : ''}
          onClick={() => setActiveTab('rental')}
        >
          Rental
        </li>
        
      </NavList>
    </MiniNavContainer>
  );
};

export default function RiderInfo() {
  const [activeTab, setActiveTab] = useState('ride');
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    drop: "",
    vehicleType: "Car",
  });

  const [rentalFormData, setRentalFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rentalType: "Daily",
    duration: "1"
  });

  const [vehicles] = useState([
    { id: 1, type: "Car", name: "Toyota Prius", model: "2020", rate: "$15/hr" },
    { id: 2, type: "Car", name: "Honda Civic", model: "2022", rate: "$18/hr" },
    { id: 3, type: "Bike", name: "Yamaha FZ", model: "2021", rate: "$8/hr" },
    { id: 4, type: "Bike", name: "Royal Enfield", model: "2020", rate: "$10/hr" },
  ]);

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const indianLocations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRentalChange = (e) =>
    setRentalFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleVehicleClick = (vehicle) => {
    setFormData((prev) => ({
      ...prev,
      vehicleType: vehicle.type,
    }));
    setSelectedVehicleId(vehicle.id);
  };

  const fillRandomLocation = (field) => {
    const randomLoc =
      indianLocations[Math.floor(Math.random() * indianLocations.length)];
    setFormData((prev) => ({
      ...prev,
      [field]: randomLoc,
    }));
  };

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

  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/api/rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalFormData),
      });

      const result = await response.json();
      alert(`Rental request submitted! ${result.message}`);
    }
    catch (err) {
      console.error(err);
      alert("Something went wrong while submitting rental request.");
    }
  };

  const handleGetStarted = () => {
    setActiveTab('rental');
  };

  return (
    <Container>
      <MiniNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'ride' ? (
        <>
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

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    type="text"
                    name="pickup"
                    placeholder="Pickup Location"
                    value={formData.pickup}
                    onChange={handleChange}
                    required
                  />
                  <SmallButton
                    type="button"
                    onClick={() => fillRandomLocation("pickup")}
                    title="Random Pickup Location"
                  >
                    🎲
                  </SmallButton>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    type="text"
                    name="drop"
                    placeholder="Drop Location"
                    value={formData.drop}
                    onChange={handleChange}
                    required
                  />
                  <SmallButton
                    type="button"
                    onClick={() => fillRandomLocation("drop")}
                    title="Random Drop Location"
                  >
                    🎲
                  </SmallButton>
                </div>

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
              <VehicleCard
                key={vehicle.id}
                onClick={() => handleVehicleClick(vehicle)}
                selected={vehicle.id === selectedVehicleId}
              >
                <h4>
                  {vehicle.name} ({vehicle.type})
                </h4>
                <p>Model: {vehicle.model}</p>
                <p>Rate: {vehicle.rate}</p>
              </VehicleCard>
            ))}
          </VehicleGrid>
        </>
      ) : (
        <>
          <Title>Rent a Vehicle</Title>
          <SplitLayout>
            <FormWrapper>
              <RentalForm>
                <h3>Get Started with Vehicle Rental</h3>
                <p>Fill in your details and we'll contact you to complete the rental process</p>
                
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={rentalFormData.name}
                  onChange={handleRentalChange}
                  required
                />
                
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={rentalFormData.phone}
                  onChange={handleRentalChange}
                  required
                />
                
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={rentalFormData.email}
                  onChange={handleRentalChange}
                  required
                />
                
                <Select
                  name="rentalType"
                  value={rentalFormData.rentalType}
                  onChange={handleRentalChange}
                >
                  <option value="Daily">Daily Rental</option>
                  <option value="Weekly">Weekly Rental</option>
                  <option value="Monthly">Monthly Rental</option>
                </Select>
                
                <Select
                  name="duration"
                  value={rentalFormData.duration}
                  onChange={handleRentalChange}
                >
                  <option value="1">1 Day/Week/Month</option>
                  <option value="3">3 Days/Weeks/Months</option>
                  <option value="7">7 Days/Weeks/Months</option>
                  <option value="30">30 Days (1 Month)</option>
                </Select>
                
                <GetStartedButton onClick={handleRentalSubmit}>
                  Submit Rental Request
                </GetStartedButton>
              </RentalForm>
            </FormWrapper>
            
            <MapWrapper>
              <MapComponent />
            </MapWrapper>
          </SplitLayout>
          
          <Title>Our Rental Fleet</Title>
          <VehicleGrid>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id}>
                <h4>
                  {vehicle.name} ({vehicle.type})
                </h4>
                <p>Model: {vehicle.model}</p>
                <p>Rental Rate: {vehicle.type === 'Car' ? '$50/day' : '$20/day'}</p>
              </VehicleCard>
            ))}
          </VehicleGrid>
        </>
      )}

      <Footer />
    </Container>
  );
}