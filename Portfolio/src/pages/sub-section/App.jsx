import axios from "axios";
import React, { useEffect, useState } from "react";

const Apps = () => {
  const [app, setApp] = useState();
  const fetchApps = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/tool/getAll"
      );
      if (response?.data?.success) {
        console.log(response?.data?.allTools);
        setApp(response?.data?.allTools);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center  gap-4">
      <h1 className="md:text-[3rem] text-[1rem] md:tracking-[15px] tracking-[8px] w-fit text-tubeLight-effect dancing_text">
        My Apps
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {app &&
          app?.map((app) => (
            <div
              key={app._id}
              className="flex flex-col items-center justify-center gap-4 border border-gray-600 p-6 shadow-md rounded-md"
            >
              <img src={app?.toolImage} alt={app?.name} className="h-24 w-24" />
              <p className="text-gray-400 text-lg">{app?.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Apps;
