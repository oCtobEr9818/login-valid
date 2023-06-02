import { NavLink } from "react-router-dom";

export const Nav = () => {
  const navs = [
    {
      pageName: "首頁",
      url: "/",
    },
    {
      pageName: "登入",
      url: "/login",
    },
    {
      pageName: "註冊",
      url: "/register",
    },
  ];
  return (
    <div className="nav">
      {navs.map((item) => (
        <ul key={item.pageName}>
          <li className="w-10">
            <NavLink to={item.url}>{item.pageName}</NavLink>
          </li>
        </ul>
      ))}
    </div>
  );
};
