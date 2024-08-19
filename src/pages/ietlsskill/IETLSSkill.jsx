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
      <div className="md:w-[90%] md:mx-auto">
        <section className="flex flex-col lg:flex-row mx-auto justify-evenly items-center mt-10 md:gap-10 gap-10">
          <div className="px-5 md:p-0 md:w-[100%] lg:w-[600px] relative overflow-hidden">
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
                      <h1 className="text-blue-950 px-5 md:p-0  md:text-[1.8rem] lg:text-[2rem] text-[24px] font-bold flex text-center">
                        <div className="">{newname.toLocaleUpperCase()}</div>
                      </h1>
                    </div>
                    <div className="md:w-[100%] lg:w-[500px] px-5 md:p-0 text-[18px] mt-5 leading-10 text-start">
                      <p className="text-grays">{parse(v.description)}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <div>
          <h1 className="font-bold md:text-[30px] text-[20px] flex gap-5 justify-center my-10 text-primary items-center">
            <FaRegHandPointRight />
            ចាប់ផ្តើមតេស្តអនុវត្ត IELTS ឥឡូវនេះ
          </h1>
        </div>
        <div className="mx-auto w-[100%] my-10 px-5  md:p-0  justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10  md:w-[90%] exclude">
          {ieltsLevels?.map((selectNameLevel) => {
            {console.log("selectNameLevel.exercises:",selectNameLevel.exercises)}
            const sortedExercises = selectNameLevel.exercises
            .slice()
            .sort((a, b) => {
              // Regular expression to match the number in the title
              const getNumberFromTitle = (title) => {
                const match = title.match(/\d+/);
                return match ? parseInt(match[0], 10) : 0; // Return the number or 0 if no number is found
              };

              // Extract numbers from titles
              const numberA = getNumberFromTitle(a.title);
              const numberB = getNumberFromTitle(b.title);

              // Sort in ascending order based on the number
              return numberA - numberB;
            });

            return sortedExercises.map((exercise, index) => {
              return (
                <LessonIETLSCard
                  key={exercise.id || index} // Ensure unique keys
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
