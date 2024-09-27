import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package,
  User,
} from "lucide-react";
import Dashboard from "./subcomponents/Dashboard";
import AddProject from "./subcomponents/AddProject";
import AddTimeline from "./subcomponents/AddTimeline";
import AddSkill from "./subcomponents/AddSkill";
import AddApplication from "./subcomponents/AddApplication";
import Account from "./subcomponents/Account";
import Messages from "./subcomponents/Messages";

function Homepage() {
  const [active,setActive]=useState("Dashboard")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate("/login");
    toast.success("Logged Out Successfully");
  };

  return (
    <div className="flex">
      <div className="fixed w-16 h-screen flex flex-col justify-between items-center gap-6 bg-slate-100">
        <div className="flex flex-col items-center gap-6">
        <div onClick={()=>setActive("Dashboard")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <Home className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Dashboard
            </span>
          </div>
          <div onClick={()=>setActive("Project")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <FolderGit className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Add Project
            </span>
          </div>

          <div onClick={()=>setActive("Skill")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <FolderGit className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Add Skill
            </span>
          </div>

          <div onClick={()=>setActive("Application")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <LayoutGrid className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Add Application
            </span>
          </div>

          <div onClick={()=>setActive("Timeline")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <History className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Add Timeline
            </span>
          </div>

          <div onClick={()=>setActive("Message")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <MessageSquareMore className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Message
            </span>
          </div>

          <div onClick={()=>setActive("Account")} className="mt-5 relative flex items-center group cursor-pointer">
            <div className="w-16 flex justify-center">
              <User className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
            <span className="absolute left-14 hidden group-hover:inline-block transition-all duration-200 text-[9px] text-gray-600 font-bold whitespace-nowrap">
              Account
            </span>
          </div>
        </div>
        <div onClick={handleLogout} className="relative group mb-5 cursor-pointer">
          <div className="w-16 flex justify-center">
            <LogOut className="h-6 w-6 hover:scale-105 text-gray-700 group-hover:text-blue-500 transition-colors duration-200" />
          </div>
          <span className="hidden group-hover:inline-block absolute ml-14 font-bold text-[9px] bottom-1">Logout</span>
        </div>
      </div>
      <div className="w-[90%] h-screen mx-auto">
        {active === "Dashboard" && <Dashboard/>}
        {active === "Project" && <AddProject/>}
        {active === "Timeline" && <AddTimeline/>}
        {active === "Skill" && <AddSkill/>}
        {active === "Application" && <AddApplication/>}
        {active === "Account" && <Account/>}
        {active === "Message" && <Messages/>}
      </div>
    </div>
  );
}

export default Homepage;
