import React from "react";
import { Link } from "react-router-dom";
import speaking from "../../assets/img/Listening.png";
import Search from "./Seach";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAllSearch } from "../../redux/features/search/SearchSlide";
import { useState } from "react";
import parse from "html-react-parser";
export default function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const filteredResults = useSelector(selectAllSearch);
  //console.log("filteredResults", filteredResults);
  return (
    <>
      <main className="mx-auto">
        <section className="w-full">
          <h1 className="text-center text-[18px] md:text-[20px] lg:text-[30px] font-bold text-blues pt-4 px-1">
            លទ្ធផលមេរៀននិងលំហាត់ដែលអ្នកបានស្វែងរក
          </h1>
          <p className="text-[15px] md:text-[18px] text-justify px-4 md:w-[80%] mx-auto py-4 text-grays">
            សូមស្វាគមន៍មកកាន់ <span className="text-second">English Club</span>{" "}
            ដែលជាគេហទំព័រឥតគិតថ្លៃដែលផ្តល់ឱ្យអ្នកសិក្សានូវការធ្វើតេស្តអនុវត្តជាច្រើនដែលបែងចែកជាច្រើន
            ផ្នែក ជំនាញ ការសរសេរ​ ការអាន​ ការ​និយាយ​ ការស្តាប់ និងវេយ្យាករណ៍​ ឬ​
            ពាក្យគន្លឹចាប់ផ្តើមដំណើរការរៀនរបស់អ្នក ជាមួយគេហទំព័របស់យើងឥឡូវនេះ!!
          </p>
        </section>

        <div className="md:w-[90%] mx-auto pb-10">
          <div className="flex justify-between pb-2">
            <h1 className="text-[14px] md:text-[18px] pl-4 underline text-second">
              លំហាត់ទាំងអស់
            </h1>
            <h1 className="text-[14px] md:text-[18px] pr-4 text-grays">
              <span className="underline">ចំនួនលំហាត់​៖</span>
              <span className="text-primary ms-2">
                {filteredResults.exercise_number}
              </span>
            </h1>
          </div>

          <div className="items-center align-middle justify-center">
            {filteredResults?.exercises?.map((e) => {
              if (
                (e.voice &&
                  e.voice !== "" &&
                  !e.title.toLowerCase().includes("practice")) ||
                (e.video && e.video !== "" && e.video !== "Video link")
              ) {
                return (
                  <div className="px-2.5 py-6" key={e.id || e.title}>
                    <Link
                      to={`/excersice/${e.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex md:gap-3 items-center align-middle w-full h-[150px] md:w-[90%] md:h-[200px] bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 flex-1"
                    >
                      <img
                        className="object-cover w-[140px] md:w-[320px] lg:w-[350px] flex-shrink-0 h-full rounded-tl-lg"
                        src={
                          e.thumbnail ||
                          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        }
                        alt={e.title}
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-[16px] md:text-[24px] font-bold tracking-tight text-blues flex gap-3 items-center">
                          <div className="text-[14px] md:text-[18px] lg:text-[24px]">
                            {e.title || "No title"}
                          </div>
                        </h5>
                        <p className="mb-3 text-[12px] md:text-[20px] lg:text-[24px] font-normal text-gray-700 md:line-clamp-3 line-clamp-2 lg:line-clamp-4">
                          {parse(`${e.description || "No description"}`)}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="flex justify-between py-2">
            <h1 className="text-[14px] md:text-[18px] pl-4 underline text-second">
              មេរៀនទាំងអស់
            </h1>
            <h1 className="text-[14px] md:text-[18px] pr-4 text-grays">
              <span className="underline">ចំនួនមេរៀន​៖</span>
              <span className="text-primary ms-2">
                {filteredResults.lesson_number}
              </span>
            </h1>
          </div>

          <div className="items-center align-middle justify-center">
            {filteredResults?.lessons?.map((e) => (
              <div className="px-2.5 py-6" key={e.id || e.lesson_title}>
                <Link
                  to={`/lesson/${e.lesson_title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex md:gap-3 items-center align-middle w-full h-[150px] md:w-[90%] md:h-[200px] bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 flex-1"
                >
                  <img
                    className="object-cover w-[140px] md:w-[320px] lg:w-[350px] flex-shrink-0 h-full rounded-tl-lg"
                    src={
                      e.thumbnail ||
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    }
                    alt={e.lesson_title}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-[16px] md:text-[24px] font-bold tracking-tight text-blues flex gap-3 items-center">
                      <div className="lg:text-[24px]">
                        {e.lesson_title || "No title"}
                      </div>
                    </h5>
                    <p className="mb-3 text-[8px] md:text-[20px] font-normal text-gray-700 md:line-clamp-3 line-clamp-2 lg:line-clamp-4">
                      {parse(`${e.description || "No description"}`)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
