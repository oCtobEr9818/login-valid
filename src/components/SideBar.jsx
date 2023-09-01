import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    name: "PN 總攬",
    url: "/pn-summary",
  },
  {
    name: "PN 歷史資料",
    url: "/pn-history",
  },
  {
    name: "事件通知",
    url: "/event-viewer",
  },
];

const SideBar = () => {
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
      <div className="sideBar w-24 md:w-64 min-h-screen bg-sideBar border-r shadow-sideBar">
        <img
          src={`./image/${isSmallScreen ? "logo2" : "logo"}.png`}
          alt="明曜科技Logo"
          className="w-11/12 h-[68px] py-2 m-auto border-b border-gray-300 object-contain"
        />

        <div className="sideBarOptions h-auto w-auto px-0 md:px-6 pt-6 flex flex-col">
          {navs.map((nav, i) => (
            <Link
              to={nav.url}
              key={i}
              className="w-[90%] md:w-full px-2 py-2 mx-auto mt-4 block md:border border-b-1 border-options md:rounded-lg text-center text-options break-word md:bg-options bg-sideBar hover:-translate-y-1 md:hover:-translate-y-0 md:hover:text-options_hover md:hover:bg-options_hover transition-all duration-300"
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
