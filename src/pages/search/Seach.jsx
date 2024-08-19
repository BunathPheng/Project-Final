import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearch,
  selectAllSearch,
} from "../../redux/features/search/SearchSlide";
import { useNavigate } from "react-router-dom";
import "../../components/navbar/Navbar.css";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchInput) {
      dispatch(fetchSearch(searchInput));
      setDropdownVisible(true); // Show dropdown when there is search input
    } else {
      setDropdownVisible(false); // Hide dropdown when search input is empty
    }
  }, [searchInput, dispatch]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false); // Hide dropdown if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (title) => {
    setSearchInput(title); // Update input value with selected result
    setDropdownVisible(false); // Hide dropdown immediately
    navigate(`/searchs?query=${encodeURIComponent(title)}`); // Navigate with query parameter
  };

  const filteredResults = useSelector(selectAllSearch);

  return (
    <>
      <div className="relative hidden style-navbar2 lg:block lg:w-[210px] xl:w-[300px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-4 ps-10 text-sm min-[1024px]:text-[10px] min-[1111px]:text-sm text-gray-900 border border-gray-300 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="ការស្វែងរក..."
          onChange={handleInputChange}
          value={searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/searchs?query=${encodeURIComponent(searchInput)}`);
            }
          }}
          onFocus={() => setDropdownVisible(true)}
        />
        {dropdownVisible && (
          <div
            ref={dropdownRef} // Attach ref to dropdown container
            className="absolute mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-700 z-10"
          >
            {/* Check if filteredResults.exercises exists and has items */}
            {searchInput && filteredResults.exercises?.length > 0 ? (
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 h-[300px] overflow-y-auto z-50">
                {filteredResults.exercises.map((element) => (
                  <li
                    key={element.ex_uuid}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleResultClick(element.title)}
                  >
                    {element.title}
                  </li>
                ))}
              </ul>
            ) : (
              searchInput && (
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li className="p-2 text-gray-500 dark:text-gray-400">
                    No results found
                  </li>
                </ul>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
