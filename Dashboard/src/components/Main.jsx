import React from "react";
import Homepage from "./Homepage";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const { user } = useSelector((state) => state.admin);
  return (
    <div className="flex gap-1 overflow-x-hidden">
      <div className="w-[75px]">
        <Homepage />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
