import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Contact = () => {
  const [name,setName] = useState("");
  const [subject,setSubject] = useState("")
  const [message,setMessage] = useState("")
  const [loading , setLoading] = useState(false)
  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/v1/message/send" , {senderName : name,subject : subject,message : message});
      if(response?.data?.success){
        toast.success("Message Sent Successfully");
        setName("");
        setMessage("");
        setSubject("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.data?.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-[60vw] flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <span className="flex-grow h-[1px] bg-white"></span>

        <h1 className="mx-4 md:text-3xl text-sm md:font-extrabold font-bold text-white tracking-[2px]">
          Contact <span className="text-tubeLight-effect">Me</span>
        </h1>

        <span className="flex-grow h-[1px] bg-white"></span>
      </div>
      <form onSubmit={handleFormSubmit} className='w-full flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label className="text-gray-200 md:text-xl text-lg md:font-semibold font-semibold">Your Name</Label>
          <Input onChange={(e)=>setName(e.target.value)} className="w-full p-2 text-white" placeholder="Enter Your Name" value={name}/>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className="text-gray-200 text-xl font-semibold">Subject</Label>
          <Input onChange={(e)=>setSubject(e.target.value)} className="w-full p-2 text-white" placeholder="Enter Subject" value={subject}/>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className="text-gray-200 text-xl font-semibold">Message</Label>
          <Input onChange={(e)=>setMessage(e.target.value)} className="w-full p-2 text-white" placeholder="Enter Your Message..." value={message}/>
        </div>
        {
          !loading ? <Button type="submit" className="w-fit">SEND MESSAGE</Button> : <Button type="submit" className="w-fit">Loading...</Button>
        }
      </form>
    </div>
  )
}

export default Contact
