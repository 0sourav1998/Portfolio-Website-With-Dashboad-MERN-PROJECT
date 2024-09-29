import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProjectView = () => {
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    gitRepoLink: "",
    deployedLink: "",
    deployed: "",
    technologies: "",
    stack: "",
    projectImage: null,
  });

  const fetchProject = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/project/getSpecific",
      { id: id }
    );
    if (response?.data?.success) {
      setInput({
        title: response?.data?.project?.title,
        description: response?.data?.project?.description,
        stack: response?.data?.project?.stack,
        technologies: response?.data?.project?.technologies,
        gitRepoLink: response?.data?.project?.gitRepoLink,
        deployed: response?.data?.project?.deployed,
        deployedLink: response?.data?.project?.deployedLink,
        projectImage: response?.data?.project?.projectImage,
      });
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const descriptionInListFormat = input?.description?.split(".");
  const technologiesInListFormat = input?.technologies?.split(",");

  return (
    <div className="flex flex-col items-center py-12 bg-slate-900 min-h-screen">
      <div className="w-11/12 lg:w-2/3 bg-gray-200 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6">{input?.title}</h1>
        
        <img
          className="rounded-lg shadow-md mx-auto mb-6"
          src={input?.projectImage}
          alt={input?.title}
          style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
        />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {descriptionInListFormat &&
              descriptionInListFormat.map((list, index) => (
                <li key={index}>{list.trim()}</li>
              ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Technologies</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {technologiesInListFormat &&
              technologiesInListFormat.map((tech, index) => (
                <li key={index}>{tech.trim()}</li>
              ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">GitHub Link</h2>
          <Link to={input?.gitRepoLink} className="text-blue-600 hover:underline">
            {input?.gitRepoLink ? input?.gitRepoLink : "NA"}
          </Link>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Is Deployed?</h2>
          <p className="text-gray-700">{input?.deployed ? "Yes" : "No"}</p>
        </div>

        {input?.deployed && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Deployed Link</h2>
            <Link to={input?.deployedLink} className="text-blue-600 hover:underline">
              {input?.deployedLink ? input?.deployedLink : "NA"}
            </Link>
          </div>
        )}

        <div className="text-center">
          <Link to="/" className="text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
