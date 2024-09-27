import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email : input.email , password : input.password }
      );
      if (response?.data?.success) {
        dispatch(setUser(response?.data?.user));
        dispatch(setToken(response?.data?.token));
        toast.success(response?.data?.message);
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              {
                loading ? "Loading..." : "Login"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
