import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../cards/Lessoncard.css";

export default function Lessoncard({ onClick, title, des, pic, uuid }) {
  const [newtitle, setNewTitle] = useState("");
  useEffect(() => {
    let sanitizedTitle = title
      .replace(/ /g, "-")       
      .toLowerCase();           

    setNewTitle(encodeURIComponent(sanitizedTitle)); // URL encode
  }, [title]);
  //const newtitle = encodeURIComponent(title.replace(/ /g, "-"));
  // const convert = newtitle.toLowerCase();

  return (
    // <div onClick={handleClick}>
      <Link to={`${newtitle}`}>
        <div className="max-w-[430px] max-h-[261px] rounded-tr-3xl rounded-bl-3xl relative group">
          <img
            className="rounded-tr-3xl rounded-bl-3xl brightness-50 w-[400px] h-[250px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
            src={pic}
            alt="champion"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-colors duration-300">
            <h1 className="text-[18px] md:text-[20px] lg:text-[24px] font-bold text-center mt-5 drop-shadow-lg shadow-black line-clamp-1 px-5">
              {title}
            </h1>
            <p className="text-[12px] md:text-[18px] text-center mt-1 line-clamp-2 px-5">
              {des}
            </p>
          </div>
        </div>
      </Link>
    // </div>
  );
}
