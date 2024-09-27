import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/slice/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state?.admin);
  const imageRef = useRef();
  const resumeRef = useRef();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.admin)
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
  }, []);
  const handleSubmit = async()=>{
      const formData = new FormData();
      formData.append("fullName",input.fullName)
      formData.append("email",input.email)
      formData.append("phone",input.phone)
      formData.append("aboutMe",input.aboutMe)
      formData.append("portfolio",input.portfolio)
      formData.append("githubUrl",input.githubUrl)
      formData.append("linkedinUrl",input.linkedinUrl)
      formData.append("facebookUrl",input.facebookUrl)
      formData.append("instagramUrl",input.instagramUrl)
      formData.append("twitterUrl",input.twitterUrl)
      formData.append("image",input.image)
      formData.append("resume",input.resume)
      try {
        setLoading(true)
        const response = await axios.put("http://localhost:4000/api/v1/user/update/me",formData,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        console.log(response)
        if(response?.data?.success){
          dispatch(setUser(response?.data?.user))
          toast.success(response?.data?.message);
          navigate("/")
        }
      } catch (error) {
        console.log(error.response?.data?.message)
        toast.error(error?.response?.data?.message)
      }finally{
        setLoading(false)
      }
  }
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-xl font-bold">Personal Details</h1>
      <div className="flex flex-row justify-around gap-6">
        <div className="min-w-[30%]">
          <Label className="text-sm">Full Name</Label>
          <input
            value={input.fullName}
            onChange={(e)=>setInput({...input , fullName : e.target.value})}
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
          />
        </div>
        <div className="min-w-[30%]">
          <Label className="text-sm">Email</Label>
          <input
            type="email"
            value={input.email}
            onChange={(e)=>setInput({...input , email : e.target.value})}
            placeholder="Enter Your Email"
            className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
          />
        </div>
        <div className="min-w-[30%]">
          <Label className="text-sm">Phone Number</Label>
          <input
            value={input.phone}
            onChange={(e)=>setInput({...input , phone : e.target.value})}
            type="number"
            placeholder="Enter Your Phone Number"
            className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
          />
        </div>
      </div>
      <div>
        <Label>About Me</Label>
        <textarea
          value={input.aboutMe}
          onChange={(e)=>setInput({...input , aboutMe : e.target.value})}
          type="text"
          placeholder="About Me"
          className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
        />
      </div>
      <div className="flex gap-6">
        <div className="max-w-[20%]">
          <input ref={imageRef}  onChange={(e)=>setInput({...input,image : e?.target?.files[0]})} type="file" className="hidden" />
          <Button onClick={()=>imageRef.current.click()} className="bg-blue-500 hover:bg-blue-600 transition-all duration-200">
            Change Profile Picture
          </Button>
        </div>
        <div className="max-w-[20%]">
          <input ref={resumeRef}onChange={(e)=>setInput({...input, resume : e?.target?.files[0]})} type="file" className="hidden" />
          <Button onClick={()=>resumeRef.current.click()} className="bg-blue-500 hover:bg-blue-600 transition-all duration-200">
            Change Resume
          </Button>
        </div>
        <div>
          <input
            value={input.portfolio}
            onChange={(e)=>setInput({...input , portfolio : e.target.value})}
            placeholder="Enter Your Portfolio Link"
            type="text"
            className="w-[30vw] rounded-md p-2 outline-none focus-within:ring-2 focus-within:to-blue-500"
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col mt-2">
        <h1 className="text-xl font-bold mb-4">Social Media Links</h1>
        <div className="flex flex-row justify-around gap-6">
          <div className="min-w-[30%]">
            <Label className="text-sm">Linkedin Url</Label>
            <input
              value={input.linkedinUrl}
              onChange={(e)=>setInput({...input , linkedinUrl : e.target.value})}
              type="text"
              placeholder="Enter Your Linkedin Url"
              className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
            />
          </div>
          <div className="min-w-[30%]">
            <Label className="text-sm">Github Url</Label>
            <input
              value={input.githubUrl}
              onChange={(e)=>setInput({...input , githubUrl : e.target.value})}
              type="text"
              placeholder="Enter Your Github Url"
              className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
            />
          </div>
          <div className="min-w-[30%]">
            <Label className="text-sm">Instagram Url</Label>
            <input
              value={input.instagramUrl}
              onChange={(e)=>setInput({...input , instagramUrl : e.target.value})}
              type="text"
              placeholder="Enter Your Instagram Url"
              className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="max-w-[30%]">
            <Label className="text-sm">Twitter(x) Url</Label>
            <input
              value={input.twitterUrl}
              onChange={(e)=>setInput({...input , twitterUrl : e.target.value})}
              type="text"
              placeholder="Enter Your Twitter Url"
              className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
            />
          </div>
          <div className="max-w-[30%]">
            <Label className="text-sm">Facebook Url</Label>
            <input
              value={input.facebookUrl}
              onChange={(e)=>setInput({...input , facebookUrl : e.target.value})}
              type="text"
              placeholder="Enter Your Facebook Url"
              className="w-full mt-2 outline-none focus-within:ring-2 focus-within:ring-blue-500 p-3 rounded-md"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} className="mb-6 w-fit">{loading ? "Loading..." : "Submit"}</Button>
    </div>
  );
};

export default UpdateProfile;
