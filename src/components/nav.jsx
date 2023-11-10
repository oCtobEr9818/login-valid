import { useState, useRef, useEffect } from "react";
import { useClickAway } from "@geist-ui/core";
import { Link } from "react-router-dom";

import axiosPnListApi from "../api/axiosPnListApi";
import useAuthContext from "../context/AuthContext";

const Nav = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false); // 控制下拉選單的開關
  const [isNoticeOpen, setIsNoticeOpen] = useState(false); // 控制通知中心的開關
  const dropdownRef = useRef(null);
  const noticeRef = useRef(null);

  const [notificationCounts, setNotificationCounts] = useState(0); // 新通知的數量
  const [notificationDatas, setNotificationDatas] = useState([]); // 通知的資料

  const toggleDropdown = () => setIsOpen(!isOpen); // 切換下拉選單的顯示/隱藏
  const closeDropdown = () => setIsOpen(false); // 關閉下拉選單
  const toggleNoticeRow = () => {
    setIsNoticeOpen(!isNoticeOpen); // 切換通知中心的顯示/隱藏
  };
  const closeNoticeRow = () => setIsNoticeOpen(false); // 關閉通知中心

  useClickAway(dropdownRef, closeDropdown); // 點擊其他區域時關閉下拉選單
  useClickAway(noticeRef, closeNoticeRow); // 點擊其他區域時關閉通知中心

  useEffect(() => {
    getEventDatas(); // 初始化通知資料

    const interval = setInterval(() => {
      getEventDatas();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEventDatas = async () => {
    try {
      const response = await axiosPnListApi.get("/alerts_unread");
      const datas = response.data.data;

      if (datas) {
        setNotificationDatas(datas);
        setNotificationCounts(datas.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="navBar w-full bg-outline shadow-nav relative z-20">
        <div className="container h-10 mx-auto my-3.5 ">
          <div className="w-full text-right">
            {/* 通知中心鈴鐺圖示 */}
            <button
              id="noticeDefaultButton"
              ref={noticeRef}
              onClick={toggleNoticeRow}
              className="w-10 mr-4 leading-10 text-center text-xl relative"
              type="button"
            >
              <i
                className="fa fa-bell text-slate-100 transition-all duration-100 cursor-pointer opacity-20 hover:opacity-40"
                aria-hidden="true"
              ></i>
              {notificationCounts > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {notificationCounts}
                </span>
              )}

              {/* 通知欄 */}
              {isNoticeOpen && (
                <ul
                  id="notice"
                  className="w-60 max-h-[50vh] border-1 border-gray-700 rounded-t-lg shadow-md shadow-slate-800 text-sm text-center absolute -right-6 top-14 overflow-y-scroll hide-scrollbar"
                  aria-labelledby="noticeDefaultButton"
                >
                  <li className="bg-blue-600 text-slate-100 rounded-t-lg">
                    <span className="inline-block px-2 py-2 mx-auto">
                      通知中心
                    </span>
                  </li>
                  {notificationCounts > 0 ? (
                    notificationDatas.map((data, index) => (
                      <li>
                        <Link to="/event-viewer">
                          <div
                            key={index}
                            className="w-full px-4 py-2 bg-white dark:hover:bg-blue-200 cursor-pointer transition-all duration-200 flex items-center"
                          >
                            <div className="w-10 mr-4">{data.alert_type}</div>
                            <div className="w-full flex flex-col text-left">
                              <div className="text-[12px] text-gray-500">
                                {data.created_at}
                              </div>
                              <div>{data.message}</div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>
                      <span className="w-full inline-block px-2 py-3 mx-auto bg-white cursor-text">
                        尚無通知
                      </span>
                    </li>
                  )}
                  <li className="sticky bottom-0">
                    <Link
                      to="/event-viewer"
                      className="w-full inline-block px-2 py-3 mx-auto bg-blue-200 dark:hover:bg-blue-500 dark:hover:text-white  cursor-pointer transition-all duration-200"
                    >
                      顯示所有通知
                    </Link>
                  </li>
                </ul>
              )}
            </button>

            {/* 使用者名稱 */}
            {user && (
              <>
                <button
                  ref={dropdownRef}
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  className="w-auto py-3 pl-4 mr-8 text-gray-200 font-semibold text-sm text-center inline-flex items-center border-l border-gray-500 relative"
                  type="button"
                >
                  {user.name}
                  <span className="w-2.5 ml-5 text-xs">
                    <i
                      className={`fa ${
                        isOpen ? "fa-chevron-up" : "fa-chevron-down"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </span>

                  {/* 登出按鈕 */}
                  {isOpen && (
                    <ul
                      id="dropdown"
                      className="w-28 py-1 rounded-lg shadow absolute -right-2 top-14 text-base text-gray-700 dark:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-white-100 dark:hover:rounded-lg"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <button onClick={logout} className="w-full py-2">
                          登出
                        </button>
                      </li>
                    </ul>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
