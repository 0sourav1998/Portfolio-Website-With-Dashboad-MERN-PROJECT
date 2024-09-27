import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const {token} = useParams();
  console.log("Token",token)
  const [password , setPassword]= useState(null);
  const [confirmPassword,setConfirmPassword] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:4000/api/v1/user/resetPassword/reset-password",{password:password,confirmPassword:confirmPassword,token:token})
      if(response?.data?.success){
        navigate("/login");
        toast.success(response?.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter new Password to Continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {
                loading ? "Loading..." : "Submit"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword
