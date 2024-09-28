import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";

const UpdateProject = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    gitRepoLink: "",
    deployedLink: "",
    deployed: "",
    technologies: "",
    stack: "",
    projectImage: null,
    projectBanner: null,
  });
  const { token } = useSelector((state) => state.admin);

  const handleSubmit = async() => {
    const formData =  new FormData();
    formData.append("id",id)
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("deployed", input.deployed);
    formData.append("deployedLink", input.deployedLink);
    formData.append("technologies", input.technologies);
    formData.append("stack", input.stack);
    formData.append("gitRepoLink", input.gitRepoLink);
    formData.append("projectImage", input.projectImage);
    try {
        setLoading(true);
        const response = await axios.put("http://localhost:4000/api/v1/project/update/project",formData,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response?.data?.success){
            navigate("/")
            toast.success(response?.data?.message);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }finally{
        setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setInput((prevInput) => ({
            ...prevInput,
            projectImage: file,
            projectBanner: reader.result,
          }));
        };
      };

  const fetchProject = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/project/getSpecific",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.success) {
      console.log(response);
      setInput({
        title: response?.data?.project?.title,
        description: response?.data?.project?.description,
        stack: response?.data?.project?.stack,
        technologies: response?.data?.project?.technologies,
        gitRepoLink: response?.data?.project?.gitRepoLink,
        deployed: response?.data?.project?.deployed,
        deployedLink: response?.data?.project?.deployedLink,
        projectImage: response?.data?.project?.projectImage,
        projectBanner : response?.data?.project?.projectImage
      });
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <div className="mt-56">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[60%] p-6 bg-gray-200 rounded-md shadow-lg">
          <div>
            <h1 className="text-3xl text-gray-600 font-bold text-center">
              Edit Project
            </h1>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <div className="w-full flex flex-col gap-6 justify-center">
                <img
                  src={input.projectBanner}
                  className="w-60 h-36 mx-auto "
                  alt="Banner-Image"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={imageRef}
                />
                <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700 transition-all duration-200" onClick={()=>imageRef.current.click()}>Upload Image</button>
              </div>
              <Label className="text-lg font-semibold text-gray-600">
                Title
              </Label>
              <Input
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                type="text"
                placeholder="Enter Project Title"
                value={input.title}
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Description
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
                value={input.description}
                placeholder="Enter Project Description"
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Github Repo Link
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, gitRepoLink: e.target.value })
                }
                type="text"
                value={input.gitRepoLink}
                placeholder="Paste Your Github Link here..."
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Technologies Used In The Project
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, technologies: e.target.value })
                }
                value={input.technologies}
                type="text"
                placeholder="HTML,CSS,JS..."
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Stack(MERN,MEAN,MEVN etc...)
              </Label>
              <Input
                onChange={(e) => setInput({ ...input, stack: e.target.value })}
                type="text"
                value={input.stack}
                placeholder="MERN/MEAN/MEVN..."
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Is These Project Deployed
              </Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, deployed: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Yes/No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">YES</SelectItem>
                  <SelectItem value="no">NO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Deployed Link
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, deployedLink: e.target.value })
                }
                type="text"
                value={input.deployedLink}
                placeholder="Paste Your Project Deployed Link here..."
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <Button onClick={handleSubmit}>{loading ? "Loading..." : "Submit"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
