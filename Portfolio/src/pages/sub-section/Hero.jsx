import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { ExternalLink, Facebook, FacebookIcon, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/getProfile/portfolio"
      );
      if (response.data?.success) {
        setUser(response?.data?.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="w-full flex flex-col md:gap-6 gap-3 justify-center items-center md:mt-12 mt-6 ml-4 md:ml-0">
      <h1 className="overflow-x-hidden text-[1.5rem] md:text-[2.3rem] lg:text-[2.8rem] tracking-[2px] text-white">
        Hi , I am {user?.fullName}
      </h1>
      <div
        className="
       text-tubeLight-effect overflow-x-hidden text-[1rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] flex items-center justify-center"
      >
        <Typewriter
          words={[
            "MERN STACK DEVELOPER",
            "FULL STACK DEVELOPER",
            "BACKEND DEVELOPER",
            "FRONTEND dEVELOPER",
          ]}
          typeSpeed={80}
          deleteSpeed={80}
          delaySpeed={20}
          loop={50}
          cursor
        />
      </div>
      <div className="bg-gray-50 w-fit rounded-md flex mt-8 gap-5 p-2">
        <Link to={user.facebookUrl} target="_blank">
          <Facebook className="md:h-6 md:w-6 h-4 w-4 text-blue-800"/>
        </Link>
        <Link to={user.instagramUrl} target="_blank">
          <Instagram className="md:h-6 md:w-6 h-4 w-4 text-red-700"/>
        </Link>
        <Link to={user.linkedinUrl} target="_blank">
          <Linkedin className="md:h-6 md:w-6 h-4 w-4 text-sky-500"/>
        </Link>
        <Link to={user.twitterUrl} target="_blank">
          <Twitter className="md:h-6 md:w-6 h-4 w-4 text-sky-500"/>
        </Link>
      </div>
      <div className="mt-4 flex flex-row gap-6">
        <Link to={user?.githubUrl} target="_blank">
          <Button>
            <span><Github/></span>
            Github
          </Button>
        </Link>
        <Link to={user?.resume} target="_blank">
          <Button>
            <span><ExternalLink/></span>
            Resume
          </Button>
        </Link>
      </div>
      <div className="mt-4 md:mt-8 sm:text-center text-left md:ml-1.5 sm:max-w-[90%]">
        <p className="md:text-xl text-xs text-white sm:tracking-[2px] tracking-[1px]">{user?.aboutMe}</p>
      </div>
      <hr className="text-white md:w-[700px] w-[200px] h-[2px] mt-8"/>
    </div>
  );
};

export default Hero;
