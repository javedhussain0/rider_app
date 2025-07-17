import React from "react";
import styled from "styled-components";
import Nav from "../components/nav.jsx"
import Hero from "../components/hero.jsx";
import Poster from "../components/Poster.jsx";
import Footer from "../components/Footer.jsx";


const Container = styled.div`
  background: linear-gradient(to bottom right, #f3f5f9, #e9f1ff);

`

const Home = () =>{
    return(

        <Container>
            <Nav/>
            <Hero/>
            <Poster/>
            <Footer/>
           </Container>
    )
}

export default Home;