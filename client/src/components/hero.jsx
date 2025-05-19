import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import heroCar from "../assets/heroImage/heroCar.jpg";
import heroCar2 from "../assets/heroImage/picture.png";
import heroCar3 from "../assets/heroImage/picture2.png";

const HeroContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    animation: zoom 10s ease-in-out infinite;
    transition: background-image 1s ease-in-out;
    z-index: 0;
  }

  @keyframes zoom {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  color: #fff;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #f1f1f1;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #007BFF, #0056b3);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }
`;

export default function Hero() {
  const navigate = useNavigate();
  const images = [heroCar, heroCar2, heroCar3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <HeroContainer bgImage={images[currentImageIndex]}>
      <HeroContent>
        <h1>Start Your Journey With Us</h1>
        <p>Book a ride anytime, anywhere with confidence and ease.</p>
        <Button onClick={() => navigate("/RiderInfo")}>Get Started</Button>
      </HeroContent>
    </HeroContainer>
  );
}
