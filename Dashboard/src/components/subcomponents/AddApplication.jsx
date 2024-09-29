import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const AddApplication = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    image: "",
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("toolImage", input.image);
      const response = await axios.post(
        "http://localhost:4000/api/v1/tool/add",
        formData,
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
          name: "",
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
      <div className="sm:w-[60%] w-fit sm:p-6 p-3 bg-gray-200 rounded-md shadow-lg mr-4 sm:mr-0">
        <div>
          <h1 className="sm:text-3xl text-xl text-gray-600 font-bold text-center">
            Add Software Application
          </h1>
        </div>
        <form className="flex flex-col sm:gap-4 gap-1 mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">
              Name
            </Label>
            <Input
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              type="text"
              placeholder = "Add Application Name"
              value={input.title}
              className="w-full p-2 outline-none focus-within:ring-2 focus-within:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-lg font-semibold text-gray-600">
              Application Image
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
  )
}

export default AddApplication
