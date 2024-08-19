import React from "react";
import { Link } from "react-router-dom";
import "./Lessoncard.css";
export default function CardContentUpdate({ img, title, des, value }) {
  return (
    <>
      <div>
        <div className="bg-slate-100  rounded-tl-[10%] rounded-br-[10%] border-gray-100 border-1 pb-8">
          <img
            className="w-[500px] h-[350px] img-new object-cover rounded-tl-[10%] "
            src={img}
            alt={title}
          />
          <h1 className=" font-new text-[24px] font-bold text-second text-center mt-5 line-clamp-1 px-5">
            {title}
          </h1>
          <p className="font-suwannaphum  text-[16px] text-center pb-6 px-4 line-clamp-3 pt-2">
            {des}
          </p>
        </div>
      </div>
    </>
  );
}
