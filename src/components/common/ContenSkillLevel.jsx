import React from "react";

export default function ContenSkillLevel({ skill_name, description, img }) {
  return (
    <>
      <div className="relative">
        <img
          src={img}
          alt="skill"
          className="w-full h-[500px] object-cover mx-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="absolute bottom-28 md:left-[40px] px-[20px] md:px-[5px] lg:px-[7px]">
        <h1 className="text-[32px] font-bold text-second">{skill_name}</h1>
        <p className="text-white mt-2 text-xl text-start">{description}</p>
      </div>
    </>
  );
}
