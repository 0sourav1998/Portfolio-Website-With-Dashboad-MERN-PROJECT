import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddProject = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.admin);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
      const response = await axios.post(
        "http://localhost:4000/api/v1/project/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response?.data?.message);
        setInput({
          title: "",
          description: "",
          gitRepoLink: "",
          deployedLink: "",
          deployed: "",
          technologies: "",
          stack: "",
          projectImage: null,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center mt-36 ml-6">
        <div className="w-[60%] p-6 bg-gray-200 rounded-md shadow-lg">
          <div>
            <h1 className="text-3xl text-gray-600 font-bold text-center">
              Add Project
            </h1>
          </div>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
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
                Project Banner
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, projectImage: e.target.files[0] })
                }
                type="file"
                value={input.projectImage ? "" : null}
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
            <Button type="submit">{loading ? "Loading..." : "Submit"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
