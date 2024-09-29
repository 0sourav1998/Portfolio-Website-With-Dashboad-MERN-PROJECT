import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/slice/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, token } = useSelector((state) => state?.admin);
  const imageRef = useRef();
  const resumeRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    portfolio: "",
    githubUrl: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    image: null,
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        portfolio: user.portfolio || "",
        aboutMe: user.aboutMe || "",
        image: user.image || null,
        resume: user.resume || null,
        linkedinUrl: user.linkedinUrl || "",
        instagramUrl: user.instagramUrl || "",
        facebookUrl: user.facebookUrl || "",
        twitterUrl: user.twitterUrl || "",
        githubUrl: user.githubUrl || "",
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setLoading(true);
      const response = await axios.put("http://localhost:4000/api/v1/user/update/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
        dispatch(setUser(response?.data?.user));
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto sm:py-8 py-3 px-1 sm:px-6 bg-white rounded-lg ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label className="block mb-2 text-sm">Full Name</Label>
          <input
            value={input.fullName}
            onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Email</Label>
          <input
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            placeholder="Enter Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Phone Number</Label>
          <input
            value={input.phone}
            onChange={(e) => setInput({ ...input, phone: e.target.value })}
            type="number"
            placeholder="Enter Your Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Portfolio</Label>
          <input
            value={input.portfolio}
            onChange={(e) => setInput({ ...input, portfolio: e.target.value })}
            type="text"
            placeholder="Portfolio URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <Label className="block mb-2 text-sm">About Me</Label>
        <textarea
          value={input.aboutMe}
          onChange={(e) => setInput({ ...input, aboutMe: e.target.value })}
          placeholder="Tell us about yourself"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex sm:flex-row flex-col items-center gap-4 mt-6">
        <Button onClick={() => imageRef.current.click()} className="bg-blue-500 hover:bg-blue-600">
          Change Profile Picture
        </Button>
        <input ref={imageRef} onChange={(e) => setInput({ ...input, image: e.target.files[0] })} type="file" className="hidden" />

        <Button onClick={() => resumeRef.current.click()} className="bg-blue-500 hover:bg-blue-600">
          Change Resume
        </Button>
        <input ref={resumeRef} onChange={(e) => setInput({ ...input, resume: e.target.files[0] })} type="file" className="hidden" />
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Media Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label className="block mb-2 text-sm">LinkedIn</Label>
          <input
            value={input.linkedinUrl}
            onChange={(e) => setInput({ ...input, linkedinUrl: e.target.value })}
            type="text"
            placeholder="LinkedIn URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">GitHub</Label>
          <input
            value={input.githubUrl}
            onChange={(e) => setInput({ ...input, githubUrl: e.target.value })}
            type="text"
            placeholder="GitHub URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Instagram</Label>
          <input
            value={input.instagramUrl}
            onChange={(e) => setInput({ ...input, instagramUrl: e.target.value })}
            type="text"
            placeholder="Instagram URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Twitter (X)</Label>
          <input
            value={input.twitterUrl}
            onChange={(e) => setInput({ ...input, twitterUrl: e.target.value })}
            type="text"
            placeholder="Twitter URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm">Facebook</Label>
          <input
            value={input.facebookUrl}
            onChange={(e) => setInput({ ...input, facebookUrl: e.target.value })}
            type="text"
            placeholder="Facebook URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-3">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;
