import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email,setEmail] = useState("")
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const handleForgotPassword = async()=>{
    try {
      setLoading(true)
      const response = await axios.post("http://localhost:4000/api/v1/user/resetPassword/reset-password-token",{email : email},null)
      console.log("Token->",response.data.resetToken)
      if(response.data.success){
        navigate(`/login`)
        toast.success("Email Sent Successfully")
      }
    } catch (error) {
      toast.error(error.response.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="min-h-[100vh] min-w-[100vw] flex justify-center items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Password Reset</CardTitle>
            <CardDescription>
              Enter your email to generate new Password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) =>
                  setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleForgotPassword}>
                {loading ? "Loading..." : "Send Email"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
