import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  {
    name: "首頁",
    url: "/",
  },
  {
    name: "PN 列表",
    url: "/pn-list",
  },
  {
    name: "事件通知",
    url: "/event-viewer",
  },
];

const SideBar = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="sideBar w-24 md:w-64 min-h-screen bg-[#212327] shadow-sideBar z-10">
        <img
          src={`./image/${isSmallScreen ? "logo2" : "logo-dark"}.png`}
          alt="明曜科技Logo"
          className="w-11/12 h-[68px] py-2 m-auto border-b border-gray-300 object-contain"
        />

        <div className="sideBarOptions h-auto w-auto px-0 md:px-6 pt-6 flex flex-col">
          {navs.map((nav, i) => (
            <Link
              to={nav.url}
              key={i}
              className={`w-[90%] md:w-full px-2 py-2 mx-auto mt-4 block border-options md:rounded-lg text-center text-mainText break-word hover:-translate-y-1 md:hover:-translate-y-0 md:hover:text-black md:hover:bg-[#fcfcfc] transition-all duration-200 ${
                location.pathname === nav.url ? "active" : ""
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
