import React, { useState } from "react";
import Lessoncard from "../../components/common/cards/Lessoncard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import {
  fetchSkillNameLevel,
  selectNameLevel,
} from "../../redux/skillnamelevel/skillnamelevel";
import { useEffect } from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import "../skill-exercise-page/SKillEcercise.css";
import LessonIETLSCard from "../../components/common/cards/LessonIETLSCard";
import LoadingExerciseGrammar from "../../components/common/loading/LoadingExerciseGrammar";
export default function IELTSSkill() {
  const param = useParams();
  const newname = param["ielts-name"];
  const titles = newname.replace("ietls", "b1");
  const ietls = useSelector(selectNameLevel);
  const stauss = useSelector((state) => state.skillNameLevel.status);
  const [ieltsLevels, setietlsLevels] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkillNameLevel(titles));
  }, []);
  useEffect(() => {
    const filteredSkills = ietls.filter((item) =>
      item.description.includes("IELTS")
    );
    setietlsLevels(filteredSkills);
  }, [ietls]);
  // console.log("ieltsLevels", ieltsLevels);
  // console.log("Loading", stauss);
  if (stauss === "Loading") {
    return <LoadingExerciseGrammar />;
  }
  return (
    <>
      <div className="w-[90%] mx-auto">
        <section className="flex flex-col lg:flex-row mx-auto justify-evenly items-center mt-10 md:gap-10 gap-10">
          <div className=" md:w-[100%] lg:w-[600px] relative overflow-hidden">
            {ieltsLevels?.map((v) => {
              return (
                <img className="object-cover" src={v.thumbnail} alt="Picture" />
              );
            })}
          </div>
          <div className="">
            {ieltsLevels.map((v) => {
              return (
                <>
                  <div className="">
                    <div>
                      <h1 className=" text-blue-950  md:text-[1.8rem] lg:text-[2rem] text-[24px] font-bold flex gap-5 text-center">
                        <div className="">{newname.toLocaleUpperCase()}</div>
                      </h1>
                    </div>
                    <div className="md:w-[100%] lg:w-[500px]  text-[18px] mt-5 leading-10 text-start">
                      <p className="text-grays">{parse(v.description)}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <div>
          <h1 className="font-bold md:text-[30px] text-[18px] flex gap-5 justify-center my-10 text-primary items-center">
            <FaRegHandPointRight />
            ចាប់ផ្តើមតេស្តអនុវត្តការអាន IELTS ឥឡូវនេះ
          </h1>
        </div>
        <div className="mx-auto my-10 justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 w-[320px] md:w-[90%] exclude">
          {ieltsLevels?.map((selectNameLevel) => {
            return selectNameLevel.exercises
              .slice()
              .reverse()
              .map((exercise, index) => {
                // console.log("exercise", exercise);
                return (
                  <LessonIETLSCard
                    key={index}
                    pic={exercise.thumbnail}
                    title={exercise.title}
                  />
                );
              });
          })}
        </div>
      </div>
    </>
  );
}
