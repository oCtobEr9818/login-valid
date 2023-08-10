import React from "react";
import { Link } from "react-router-dom";

const navs = [
  {
    name: "總攬",
    url: "/",
  },
  {
    name: "PN_list",
    url: "/pn-list",
  },
  {
    name: "PN_summary",
    url: "/pn-summary",
  },
  {
    name: "PN_history",
    url: "/pn-history",
  },
  {
    name: "Event viewer",
    url: "/event-viewer",
  },
];

const SideBar = () => {
  return (
    <>
      <div className="sideBar w-64 min-h-screen bg-sideBar border-r border-gray-300 shadow-lg">
        <img
          src="./image/logo.png"
          alt="明曜科技Logo"
          className=" w-11/12 px-2 py-2 m-auto border-b border-gray-300 object-contain"
        />

        <div className="sideBarOptions h-auto w-auto p-6 flex flex-col">
          {navs.map((nav, i) => (
            <Link
              to={nav.url}
              key={i}
              className=" px-0 py-3 mt-4 block border border-options rounded-lg text-center text-options bg-options hover:text-options_hover hover:bg-options_hover transition-all duration-300"
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
