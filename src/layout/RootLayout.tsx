import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import data from "../data.json";
import search from "../assets/icon-search.svg";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";

import "../App.css";

import MyProvider from "./MyProvider";

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  const inputw = useRef<HTMLInputElement>(null);
  function find() {
    if (inputw.current && inputw.current.value.length > 0) {
      const searchterm = inputw.current.value;
      const regex = new RegExp(searchterm, "i");
      const filteredResults = data.filter((el) => regex.test(el.title));
      console.log(filteredResults);
      navigate(`/searchResults`, {
        state: { movies: filteredResults, sw: searchterm },
      });
    }
  }
  return (
    <MyProvider>
      <div className="min-h-screen md:flex">
        <div className="w-full flex justify-between items-center bg-[#161D2F] h-[56px] px-[16px] sm:w-[calc(100vw-64px)] sm:rounded-md sm:mx-[0] md:w-[96px] md:h-[calc(100vh-64px)] md:my-[32px] md:py-[32px]  md:flex-col ">
          <span>
            <img src={logo} alt="logo" />
          </span>
          <nav className="flex gap-[20px]  md:flex-col">
            <NavLink to="home">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#5A698F] hover:text-white"
              >
                <path
                  d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z"
                  fill="currentColor"
                />
              </svg>
            </NavLink>
            <NavLink to="movies">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#5A698F] hover:text-white"
              >
                <path
                  d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                  fill="currentColor"
                />
              </svg>
            </NavLink>
            <NavLink to="TVseries">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#5A698F] hover:text-white"
              >
                <path
                  d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                  fill="currentColor"
                />
              </svg>
            </NavLink>
            <NavLink to="bookmarked" className="nav-link">
              <svg
                width="17"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#5A698F] hover:text-white"
              >
                <path
                  d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
                  fill="currentColor"
                />
              </svg>
            </NavLink>
          </nav>
          <img
            src={avatar}
            alt="avatar"
            className="w-[24px] h-[24px] border border-white rounded-full md:mt-[25vh]"
          />
        </div>
        <div>
          <div className="flex px-[16px] py-[24px] sm:px-[32px] md:pt-[64px] md:px-[20px]">
            <img src={search} alt="search" onClick={() => find()} />
            <input
              type="text"
              placeholder="Search for movies or TV series"
              className="appearance-none border-none bg-transparent focus:outline-none w-[80vw] pl-[16px] text-white"
              ref={inputw}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </MyProvider>
  );
}

export default RootLayout;
