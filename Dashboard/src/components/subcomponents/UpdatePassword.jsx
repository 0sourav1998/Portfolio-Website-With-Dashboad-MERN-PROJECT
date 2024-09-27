import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const UpdatePassword = () => {
  const [loading,setLoading] = useState(false);
  const {token} = useSelector((state)=>state.admin)
  const [input,setInput]=useState({
    currentPassword : "",
    newPassword : "",
    confirmNewPassword : ""
  })

  const handlePasswordUpdate = async()=>{
    try {
      setLoading(true);
      const response =  await axios.put("http://localhost:4000/api/v1/user/update/password",input,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      if(response?.data?.success){
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  return (
    <div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>Update Your Dashboard Password</h1>
          <div className='flex flex-col gap-4'>
            <Label>Enter Current Password</Label>
            <Input value={input.currentPassword} onChange={(e)=>setInput({...input,currentPassword : e.target.value})} placeholder="Enter the current Password" className="w-full p-2 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500"/>
          </div>
          <div className='flex flex-col gap-4'>
            <Label>Enter Current Password</Label>
            <Input value={input.newPassword} onChange={(e)=>setInput({...input,newPassword : e.target.value})} placeholder="Enter the current Password" className="w-full p-2 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500"/>
          </div>
          <div className='flex flex-col gap-4'>
            <Label>Enter Current Password</Label>
            <Input value={input.confirmNewPassword} onChange={(e)=>setInput({...input, confirmNewPassword : e.target.value})} placeholder="Enter the current Password" className="w-full p-2 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500"/>
          </div>
        </div>
        <Button onClick={handlePasswordUpdate}>Submit</Button>
    </div>
  )
}

export default UpdatePassword