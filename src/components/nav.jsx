import { useState, useRef } from "react";
import { useClickAway } from "@geist-ui/core";
import { Link } from "react-router-dom";

import useAuthContext from "../context/AuthContext";

const Nav = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dropdownRef = useRef(null);
  const noticeRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const toggleNoticeRow = () => setIsNoticeOpen(!isNoticeOpen);
  const closeNoticeRow = () => setIsNoticeOpen(false);

  useClickAway(dropdownRef, closeDropdown);
  useClickAway(noticeRef, closeNoticeRow);

  return (
    <>
      <nav className="navBar border-2 bg-gray-50 px-2 py-4 sm:px-4 shadow-sm  relative">
        <div className="container mx-auto my-4 flex flex-wrap items-center justify-end ">
          <div className="hidden w-full md:block md:w-auto">
            {/* 通知中心鈴鐺圖示 */}
            <button
              id="noticeDefaultButton"
              ref={noticeRef}
              onClick={toggleNoticeRow}
              className="w-10 h-10 leading-10 absolute top-3 right-44 cursor-pointer text-center text-xl"
              type="button"
            >
              <i
                className={`fa fa-bell text-black transition-all duration-100 opacity-20 hover:opacity-40 ${
                  isNoticeOpen && "opacity-40"
                }`}
                aria-hidden="true"
              ></i>
            </button>

            {isNoticeOpen && (
              <ul
                id="notice"
                className={`w-60 z-20 border-1 rounded-t-lg shadow-lg absolute right-40 top-16 text-sm text-center`}
                aria-labelledby="noticeDefaultButton"
              >
                <li className="bg-blue-600 text-slate-100 rounded-t-lg">
                  <span className="inline-block px-2 py-2 mx-auto">
                    通知中心
                  </span>
                </li>
                <li>
                  <span className="w-full inline-block px-2 py-3 mx-auto bg-white dark:hover:bg-blue-200 cursor-pointer transition-all duration-200">
                    尚無通知
                  </span>
                </li>
                <li>
                  <Link
                    to="/event-viewer"
                    className="w-full inline-block px-2 py-3 mx-auto border-t-1 dark:hover:bg-blue-200  cursor-pointer transition-all duration-200"
                  >
                    顯示所有通知
                  </Link>
                </li>
              </ul>
            )}

            {user && (
              <>
                <button
                  ref={dropdownRef}
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  className=" text-gray-800 font-semibold text-sm px-5 py-2.5 text-center inline-flex items-center border-l border-gray-500 absolute top-3 right-10"
                  type="button"
                >
                  {user.name}
                  <span className="w-2.5 ml-2.5 text-xs">
                    <i
                      className={`fa ${
                        isOpen ? "fa-chevron-up" : "fa-chevron-down"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>

                {/* 當isOpen = true，會顯示下拉式選單 */}
                {isOpen && (
                  <ul
                    id="dropdown"
                    className="w-28 py-1 z-10 bg-white rounded-lg shadow absolute right-10 top-16 text-base text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:rounded-lg"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        onClick={logout}
                        className="block px-2 py-2 mx-auto"
                      >
                        登出
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
