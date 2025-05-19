import React from "react";
import Nav from "../components/nav.jsx"
import Hero from "../components/hero.jsx";
import Poster from "../components/Poster.jsx";
import Footer from "../components/Footer.jsx";
const Home = () =>{
    return(
        <div>
            <Nav/>
            <Hero/>
            <Poster/>
            <Footer/>
        </div>
    )
}

export default Home;