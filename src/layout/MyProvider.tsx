import { useEffect, createContext, useState } from "react";
import axios from "axios";

interface MyContextProps {
  imageSrcKey: string;
  sliderim: string;
  data: Movie[];
  setData: React.Dispatch<React.SetStateAction<Movie[]>>;
  fetchData: () => Promise<void>;
  update: (el: Movie) => Promise<void>;
}

export const MyContext = createContext<MyContextProps>({
  imageSrcKey: "small",
  sliderim: "small",
  data: [],
  setData: () => {},
  fetchData: async () => {},
  update: async () => {},
});

interface MyProviderProps {
  children: React.ReactNode;
}

interface Thumbnail {
  trending: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface Movie {
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let imageSrcKey = "large";
  let sliderim = "large";

  if (windowWidth <= 768) {
    imageSrcKey = "medium";
  }
  if (windowWidth <= 476) {
    imageSrcKey = "small";
    sliderim = "small";
  }
  const [data, setData] = useState<Movie[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/data.json");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const update = async (el: Movie) => {
    try {
      // Modify the data (replace this with your actual logic)
      const ind = data.findIndex((obj: Movie) => obj.title === el.title);
      const temp = [...data];
      temp[ind].isBookmarked = !temp[ind].isBookmarked;

      // Update the data.json file on the server
      await axios.put("/data.json", temp);

      // Update the state with the modified data
      setData(temp);
    } catch (error) {
      console.error("Error modifying data:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{ imageSrcKey, sliderim, data, setData, fetchData, update }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
