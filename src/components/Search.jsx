import { useState, useRef } from "react";
import { useClickAway } from "@geist-ui/core";

const Search = ({
  options,
  onSearch,
  searchQuery,
  setSearchQuery,
  selectedOption,
  setSelectedOption,
  initialPlaceholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const initialOption = "所有類別";

  // 切換下拉選單狀態
  const toggleDropdown = () => setIsOpen(!isOpen);
  // 關閉下拉選單
  const closeDropdown = () => setIsOpen(false);

  // 處理下拉選單選擇
  const handleDropdownClick = (option) => {
    setSelectedOption(option);
    setSearchQuery("");
    closeDropdown();
  };

  // 使用 useClickAway Hook，在點擊其他地方時關閉下拉選單
  useClickAway(dropdownRef, closeDropdown);

  return (
    <>
      <div className="flex lg:w-1/3 w-full h-full relative">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium sr-only text-white"
        ></label>

        {/* 所有類別按鈕 */}
        <button
          id="dropdown-button"
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none dark:focus:bg-gray-600 dark:focus:text-white"
          type="button"
        >
          {selectedOption || initialOption}
          <i className="fa fa-chevron-down w-2.5 ml-2.5"></i>
        </button>

        {/* 下拉選單內容 */}
        {isOpen && (
          <div
            id="dropdown"
            className="w-28 z-10 bg-gray-50 border border-gray-300 shadow absolute top-12 left-0"
          >
            <ul
              className=" text-sm text-gray-700 divide-y-1 divide-y-gray-100"
              aria-labelledby="dropdown-button"
            >
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2.5 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleDropdownClick(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 搜尋輸入框 */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none"
            placeholder={`${
              selectedOption === initialOption
                ? initialPlaceholder
                : selectedOption
            }`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            required
          />
        </div>
      </div>
    </>
  );
};

export default Search;
