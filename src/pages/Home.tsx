import oval from "/Oval.svg";
import bempty from "/assets/icon-bookmark-empty.svg";
import bfull from "/assets/icon-bookmark-full.svg";
import { MyContext } from "../layout/MyProvider";
import { useContext, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Home() {
  const { imageSrcKey, sliderim, data, fetchData, update } =
    useContext(MyContext);

  // const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const trending = data.filter((el) => el.isTrending === true);
  const recom = data.filter((el) => el.isTrending !== true);

  const [w, setw] = useState(0);
  const slider_wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slider_wrapper.current)
      setw(
        slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
      );
  }, []);

  return (
    <div className="pl-[16px]">
      <h1 className="text-xl font-light tracking-tight text-white py-[24px] px-[6px] sm:px-[22px] md:px-[10px] sm:text-3xl">
        Trending
      </h1>
      <motion.div
        className="slider_wrapper overflow-hidden flex w-[calc(100vw-16px)] sm:w-[calc(100vw-26px)]"
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="inner_crousel inline-flex gap-[16px] pl-[10px]"
          drag="x"
          dragConstraints={{ right: 0, left: -w }}
        >
          {trending.map((el) => (
            <div
              className="relative w-[240px] h-[140px] sm:w-[470px] sm:h-[230px]"
              key={el.title}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/50"></div>
              <div
                className="absolute top-[10px] right-[10px] p-[10px] bg-[#10141E] rounded-full opacity-70"
                onClick={() => update(el)}
              >
                <img src={el.isBookmarked ? bfull : bempty} className="" />
              </div>
              <img
                src={(el.thumbnail.regular as Record<string, string>)[sliderim]}
                className="w-full h-full  rounded-lg "
              />
              <div className="absolute top-[70%] left-[10%]">
                <p className=" text-xs text-white font-light opacity-75 flex sm:text-sm">
                  {el.year} &nbsp; <img src={oval} /> &nbsp; {el.category}{" "}
                  &nbsp;
                  <img src={oval} /> &nbsp; {el.rating}
                </p>
                <h2 className="text-sm text-white font-medium pb-[16px] sm:text-lg">
                  {el.title}
                </h2>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="pr-[16px] w-[calc(100vw - 32px)]">
        <h1 className="text-xl font-light tracking-tight text-white py-[24px] px-[16px] sm:px-[22px] md:px-[10px] sm:text-3xl">
          Recommended for you
        </h1>
        <div className="flex flex-wrap justify-around mr-[32px]">
          {recom.map((el) => (
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
    </div>
  );
}

export default Home;
