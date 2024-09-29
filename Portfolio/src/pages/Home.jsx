import React from "react";
import Hero from "./sub-section/Hero";
import Timeline from "./sub-section/Timeline";
import About from "./sub-section/About";
import Portfolio from "./sub-section/Portfolio";
import Contact from "./sub-section/Contact";
import Skill from "./sub-section/Skill";
import App from "./sub-section/App";
import Footer from "./sub-section/Footer";

const Home = () => {
  return (
    <div className="max-w-11/12 w-full bg-gray-900 flex flex-col items-center justify-center md:gap-12 gap-6 overflow-x-hidden">
      <Hero />
      <Timeline />
      <About />
      <Skill />
      <Portfolio />
      <App />
      <Contact />
      <Footer/>
    </div>
  );
};

export default Home;
