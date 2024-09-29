import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  const fetchTimeline = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/timeline/getAll"
      );
      if (response?.data?.success) {
        console.log(response?.data?.success)
        setTimeline(response?.data?.allTimelines);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  return (
    <div className="ml-4 md:ml-0">
      <h1 className="flex flex-col md:gap-4 gap-2 text-white md:text-2xl text-xl md:font-bold font-semibold">Timeline</h1>
      <div className="flex flex-col md:justify-start justify-center">
        {timeline &&
          timeline.map((time, index) => (
            <ol
              key={index}
              className="relative border-s border-gray-200 dark:border-gray-700 p-4"
            >
               <li key={index} className="mb-6 ms-6">
             <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                 <svg
                   className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                   aria-hidden="true"
                   xmlns="http:www.w3.org/2000/svg"
                   fill="currentColor"
                   viewBox="0 0 20 20"
                 >
                   <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                 </svg>
               </span>
               <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                 {time.title}
               </h3>
               <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                 {time.timeline.from} - {time.timeline.to && time.timeline.to || "Present"}
               </time>
               <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                 {time.description}
               </p>
             </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default Timeline;

