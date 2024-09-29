import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/project/getAll"
      );
      if (response?.data?.success) {
        console.log(response?.data?.success);
        setProjects(response?.data?.allProject);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-[60vw] items-center justify-center">
        <span className="flex-grow h-[1px] bg-white"></span>

        <h1 className="mx-4 md:text-3xl text-sm font-bold md:font-extrabold text-white tracking-[2px]">
          My <span className="text-tubeLight-effect">Portfolio</span>
        </h1>

        <span className="flex-grow h-[1px] bg-white"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {viewAll
          ? projects &&
            projects.map((project) => (
              <Link
                to={`/view/project/${project._id}`}
                target="_blank"
                key={project._id}
              >
                <img
                  className="h-44 w-72 mt-6 rounded-md shadow-md hover:transition-all hover:scale-110 duration-200"
                  src={project.projectImage}
                />
              </Link>
            ))
          : projects &&
            projects.slice(0, 6).map((project) => (
              <Link
                to={`/view/project/${project._id}`}
                target="_blank"
                key={project._id}
              >
                <img
                  className="h-44 w-72 mt-6 rounded-md shadow-md hover:transition-all hover:scale-110 duration-200"
                  src={project.projectImage}
                />
              </Link>
            ))}
      </div>
      {projects && projects.length > 0 && (
        <div className="mt-4">
          <Button
            onClick={() => setViewAll((prev) => !prev)}
            className="w-full bg-gray-300"
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
