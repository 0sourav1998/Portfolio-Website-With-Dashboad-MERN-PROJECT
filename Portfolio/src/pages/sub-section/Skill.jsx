import axios from "axios";
import React, { useEffect, useState } from "react";

const Skill = () => {
  const [skill, setSkill] = useState();
  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/skill/getAll"
      );
      if (response?.data?.success) {
        console.log(response?.data?.getAllSkill);
        setSkill(response?.data?.getAllSkill);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center  gap-4">
      <h1 className="md:text-[3rem] text-[1.5rem] md:tracking-[15px] tracking-[8px] w-fit text-tubeLight-effect dancing_text">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skill &&
          skill?.map((sk) => (
            <div
              key={sk._id}
              className="flex flex-col items-center justify-center gap-4 border border-gray-600 p-6 shadow-md rounded-md"
            >
              <img src={sk?.skillImage} alt={sk?.title} className="h-24 w-24" />
              <p className="text-gray-400 text-lg">{sk?.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skill;
