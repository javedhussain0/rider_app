import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import styled from 'styled-components';
import Nav from "../components/nav";
import Footer from "../components/Footer";

import image from "../assets/help/image.png";
import image2 from "../assets/help/image2.png";
import image3 from "../assets/help/image3.png";
import image4 from "../assets/help/image4.png";
import image5 from "../assets/help/image5.png";

// Styled Components
const CarouselContainer = styled.div`
  width: 100%;
  padding: 40px 0;
  margin: auto;
  background: linear-gradient(to bottom right, #f2f4f8, #e9f0ff);
`;

const SlideImage = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 10px;
  object-fit: cover;
`;

const SlideCaption = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 10px;
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
`;

const SwiperStyled = styled(Swiper)`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
    position: relative;
    transition: transform 0.5s;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #333;
    background: #ddd;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const FormContainer = styled.div`
  background: linear-gradient(to bottom right, #f2f4f8, #e9f0ff);
  padding: 40px;
  border-radius: 20px;
  margin: 50px auto;
  max-width: 650px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #222;
`;

const SelectToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  button {
    padding: 12px 20px;
    margin: 0 10px;
    border-radius: 25px;
    border: none;
    background: #ddd;
    color: #333;
    font-weight: 600;
    transition: 0.3s;
    cursor: pointer;

    &.active {
      background: #4f46e5;
      color: #fff;
      transform: scale(1.05);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: 0.2s;
  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: vertical;
  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 30px;
  background: #4f46e5;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: 0.3s;

  &:hover {
    background: #3b35c4;
  }
`;

// Slider Data
const sliderData = [
  {
    image: image,
    title: 'Help',
    description: 'Explore wellness on the go! Discover personalized yoga programs in Dubai that boost your physical fitness, flexibility, and mental well-being—perfect for active riders and health-conscious users.',
  },
  {
    image: image2,
    title: 'UI UX Design',
    description: 'Experience the future of wellness with our intuitive UI/UX design, crafted for seamless navigation and personalized user journeys—making your health journey effortless and enjoyable.',
  },
  {
    image: image3,
    title: 'Artificial Neural Network',
    description: 'Harness the power of AI with our advanced neural network, designed to enhance your riding experience and optimize your health journey.',
  },
  {
    image: image4,
    title: 'ISO Smart App',
    description: 'ISO Smart connects you to advanced wellness programs. Yoga on demand—engineered for daily riders seeking strength, flexibility, and mental clarity.',
  },
  {
    image: image5,
    title: 'Legacy of Rider App',
    description: 'A legacy carved in culture and community—ride through time and values with Bhakt Prahalad, where devotion is forged in steel resolve.',
  },
];

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "Complaint"
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message || "Submitted successfully!");
    } catch (error) {
      alert("There was an error sending your request.");
    }
  };

  return (
    <CarouselContainer>
      <Nav />

      <SwiperStyled
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        navigation={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Navigation]}
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideImage src={item.image} alt={item.title} />
            <SlideCaption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </SlideCaption>
          </SwiperSlide>
        ))}
      </SwiperStyled>

      {/* Issue Form Section */}
      <FormContainer>
        <Title>Report an Issue</Title>
        <SelectToggle>
          <button
            className={formData.type === "Complaint" ? "active" : ""}
            onClick={() => handleTypeChange("Complaint")}
            type="button"
          >
            Complaint
          </button>
          <button
            className={formData.type === "Refund Request" ? "active" : ""}
            onClick={() => handleTypeChange("Refund Request")}
            type="button"
          >
            Refund Request
          </button>
        </SelectToggle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder={`Describe your ${formData.type.toLowerCase()}...`}
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">Send {formData.type}</SubmitButton>
        </form>
      </FormContainer>

      <Footer />
    </CarouselContainer>
  );
}
