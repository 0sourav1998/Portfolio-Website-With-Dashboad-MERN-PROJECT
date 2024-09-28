import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditSkill = () => {
  const {token}=useSelector((state)=>state.admin)
  const [input,setInput] = useState({
    title : "",
    proficiency : "" ,
    image : "",
  })
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
      try {
        e.preventDefault();
        console.log(input.image)
        setLoading(true);
        const formData = new FormData()
        formData.append("id",id)
        if(input?.title){
          formData.append("title",input?.title)
        }
        if(input?.proficiency){
          formData.append("proficiency",input?.proficiency)
        }
        if(input?.image){
          formData.append("skillImage",input?.image)
        }
        const response = await axios.put("http://localhost:4000/api/v1/skill/update/skill",formData,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        if(response?.data?.success){
          toast.success(response?.data?.message);
          navigate("/")
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }finally{
        setLoading(false)
      }
    }
    const [skill,setSkill] = useState("")
    const [loading,setLoading] = useState(false);
    const fetchSkillById = async()=>{
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/skill/get/${id}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        if(response?.data?.success){
          setSkill(response?.data?.getSkill)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
    useEffect(()=>{
      fetchSkillById();
    },[id])
    useEffect(()=>{
      if(skill){
        setInput({
          title : skill?.title ,
          proficiency : skill?.proficiency ,
          image : skill?.skillImage || ""
        })
      }
    },[skill])
  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[40%] p-6 bg-gray-200 rounded-md shadow-lg">
          <div>
            <h1 className="text-3xl text-gray-600 font-bold text-center">
              Edit Skill
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
  )
}

export default EditSkill
