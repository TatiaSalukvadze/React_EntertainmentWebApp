import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVseries from "./pages/TVseries";
import Bookmarked from "./pages/Bookmarked";
import SearchResults from "./pages/SearchResults";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="home" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="TVseries" element={<TVseries />} />
      <Route path="bookmarked" element={<Bookmarked />} />
      <Route path="searchResults" element={<SearchResults />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
