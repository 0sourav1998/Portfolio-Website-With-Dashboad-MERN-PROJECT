import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
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
    <div className="w-[60vw] flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <span className="flex-grow h-[1px] bg-white"></span>

        <h1 className="mx-4 md:text-3xl text-xl font-bold md:font-extrabold text-white tracking-[2px]">
          About <span className="text-tubeLight-effect">Me</span>
        </h1>

        <span className="flex-grow h-[1px] bg-white"></span>
      </div>
      <div className="flex md:flex-row flex-col gap-6">
        <img className="md:h-80 md:w-52 h-56 w-36 rotate-12 mt-6 md:ml-0 ml-6" src={user.image} alt={user.fullName} />
        <div className="w-full flex flex-col gap-2 text-white text-sm md:ml-12 md:mt-6 ml-0 mt-4">
        <p className="tracking-[1px] md:mb-3 mb-1 text-xs md:text-xs lg:text-[1.2rem] md:leading-normal">
          I am a dedicated Full Stack Developer with expertise in crafting
          dynamic, responsive web applications. Proficient in modern frontend
          technologies like React, I focus on creating intuitive, user-friendly
          interfaces. On the backend, I leverage Node.js and MongoDB to build
          efficient, scalable architectures that power seamless user
          experiences.
        </p>
        <p className="tracking-[1px] text-xs md:text-xs lg:text-[1.2rem] md:leading-normal">
          With a strong foundation in both client-side and server-side
          development, I take pride in delivering clean, maintainable code that
          meets project goals. I enjoy solving complex challenges and
          collaborating with cross-functional teams to bring innovative ideas to
          life.
        </p>
        </div>
      </div>
    </div>
  );
};

export default About;
