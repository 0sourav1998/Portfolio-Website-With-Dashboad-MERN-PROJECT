import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTimeline = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/timeline/add",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/")
        setInput({
          title: "",
          description: "",
          from: "",
          to: "",
        });
      }
    } catch (error) {
      toast.error(error.message.data.message);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="sm:w-[60%] w-fit sm:p-6 p-3 bg-gray-200 rounded-md shadow-lg mr-4 sm:mr-0">
        <div>
          <h1 className="sm:text-3xl text-xl text-gray-600 font-bold text-center">
            Add Timeline
          </h1>
        </div>
        <from className="flex flex-col sm:gap-4 gap-1 mt-4">
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">Title</Label>
            <Input
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              type="text"
              placeholder="Add Title"
              value={input.title}
              className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">
              Description
            </Label>
            <Textarea
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              placeholder="Add Description"
              value={input.description}
              className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">From</Label>
            <Input
              onChange={(e) => setInput({ ...input, from: e.target.value })}
              value={input.from}
              placeholder="When You Started"
              type="number"
              className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">To</Label>
            <Input
              onChange={(e) => setInput({ ...input, to: e.target.value })}
              value={input.to}
              placeholder="When It Ends"
              type="number"
              className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </from>
      </div>
    </div>
  );
};

export default AddTimeline;
