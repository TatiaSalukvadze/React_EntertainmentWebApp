import { useLocation } from "react-router-dom";
import bempty from "/assets/icon-bookmark-empty.svg";
import bfull from "/assets/icon-bookmark-full.svg";
import oval from "/Oval.svg";
import { MyContext } from "../layout/MyProvider";
import { useContext, useEffect } from "react";

function SearchResults() {
  const { imageSrcKey, fetchData, update } = useContext(MyContext);

  const { state } = useLocation();
  const data = state.movies;

  useEffect(() => {
    fetchData();
  }, []);
  if (!state || !state.movies || state.movies.length === 0) {
    return (
      <div className="px-[10px]">
        <h1 className="text-xl font-light tracking-tight text-white py-[24px] px-[16px] sm:px-[22px] md:px-[10px] sm:text-3xl">
          No results for '{state.sw}'
        </h1>
      </div>
    );
  } else {
    return (
      <div className="px-[10px]">
        <h1 className="text-xl font-light tracking-tight text-white py-[24px] px-[16px] sm:px-[22px] md:px-[10px] sm:text-3xl">
          Found {data.length} results for '{state.sw}'
        </h1>
        <div className="flex flex-wrap justify-around">
          {data.map((el: any) => (
            <div className="relative" key={el.title}>
              <div
                className="absolute top-[10px] right-[10px] p-[10px] bg-[#10141E] rounded-full opacity-70"
                onClick={() => update(el)}
              >
                <img src={el.isBookmarked ? bfull : bempty} className="" />
              </div>
              <img
                src={
                  (el.thumbnail.regular as Record<string, string>)[imageSrcKey]
                }
                className="w-[164px] h-[110px] sm:w-[220px] sm:h-[140px] md:w-[280px] md:h-[174px] rounded-lg"
              />
              <p className=" text-xs text-white font-light opacity-75 flex sm:text-sm">
                {el.year} &nbsp; <img src={oval} /> &nbsp; {el.category} &nbsp;
                <img src={oval} /> &nbsp; {el.rating}
              </p>
              <h2 className="text-sm text-white font-medium pb-[16px] sm:text-lg">
                {el.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResults;
