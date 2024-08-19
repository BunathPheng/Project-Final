import React, { useState } from "react";
import Lessoncard from "../../components/common/cards/Lessoncard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSkillNameLevel,
  selectNameLevel,
} from "../../redux/skillnamelevel/skillnamelevel";
import { useEffect } from "react";
import Listening from "../../assets/img/Listening2.png";
import { FaRegHandPointRight } from "react-icons/fa";
import { fetchGrammarsByLevel } from "../../redux/features/grammar/grammarSllice";
import "../skill-exercise-page/SKillEcercise.css";
import parse from "html-react-parser";
import LoadingExerciseGrammar from "../../components/common/loading/LoadingExerciseGrammar";
export default function SkillExerciseGrammar() {
  const param = useParams();
  let title = "";
  const levels = param["level-grammar"];
  const newlevels = levels.split("-");
  const name = levels.slice(0, 5).toLocaleUpperCase();
  const grammarLevel = useSelector((state) => state.grammar.grammarLevels);
  const satuss = useSelector((state) => state.grammar.status);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchGrammarsByLevel(newlevels[0]));
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);
  console.log("satuss", satuss);
  if (satuss === "Loading") {
    return <LoadingExerciseGrammar />;
  }
  // console.log("grammarLevel", grammarLevel);
  return (
    <div className="md:w-[90%] md:mx-auto">
      <section className="flex flex-col lg:flex-row mx-auto justify-evenly items-center mt-10 md:gap-10 gap-10">
        <div className="px-5 md:p-0 md:w-[100%] lg:w-[600px] relative overflow-hidden">
          {grammarLevel.map((v) => {
            return (
              <div key={index}>
              <img className="object-cover" src={v.thumbnail} alt="Picture" />
              </div>
            );
          })}
        </div>
        <div className="">
          {grammarLevel.map((v, index) => {
            return (
              <div key={index}>
                <div>
                  <h1 className="text-blue-950 px-5 md:p-0  md:text-[1.8rem] lg:text-[2rem] text-[24px] font-bold flex text-center">
                    <div className="">{title}</div>
                    <div className="">{`${name}  `} វេយ្យាករណ៍</div>
                  </h1>
                </div>
                <div className="md:w-[100%] lg:w-[500px] px-5 md:p-0 text-[18px] mt-5 leading-10 text-start">
                  <p className="text-grays">{parse(`${v.description}`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div>
        <h1 className="font-bold md:text-[30px] text-[24px] flex gap-5 justify-center my-10 text-primary items-center">
          <FaRegHandPointRight />
          សូមធ្វើការជ្រើសរើសមេរៀន
        </h1>
      </div>
      <div className="mx-auto w-[100%] my-10 px-5  md:p-0  justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10  md:w-[90%] exclude">
        {grammarLevel.map((selectNameLevel) => {
          console.log("selectNameLevel:",selectNameLevel);
          // console.log("selectNameLevel", selectNameLevel);
          return selectNameLevel.lessons.map((excersice) => {
            // console.log("excersice", excersice);
            return (
              <>
                <Lessoncard
                  key={excersice.uuid}
                  pic={parse(excersice.thumbnail)}
                  title={parse(excersice.lesson_title)}
                  des={parse(excersice.description)}
                  uuid = {excersice.ex_uuid}
                />
              </>
            );
          });
        })}
      </div>
    </div>
  );
}
