import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const AddSkill = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.admin);
  const [input, setInput] = useState({
    title: "",
    proficiency: "",
    image: "",
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("proficiency", input.proficiency);
      formData.append("skillImage", input.image);
      const response = await axios.post(
        "http://localhost:4000/api/v1/skill/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setInput({
          title: "",
          proficiency: "",
          image: null
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[40%] p-6 bg-gray-200 rounded-md shadow-lg">
          <div>
            <h1 className="text-3xl text-gray-600 font-bold text-center">
              Add Skill
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
                placeholder="Enter Title"
                value={input.title}
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Proficiency
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, proficiency: e.target.value })
                }
                placeholder="How Much Proficient You Are?"
                value={input.proficiency}
                type="number"
                className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-lg font-semibold text-gray-600">
                Image
              </Label>
              <Input
                onChange={(e) =>
                  setInput({ ...input, image: e.target.files[0] })
                }
                type="file"
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

export default AddSkill;
