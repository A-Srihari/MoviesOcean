import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [favMovies, setFavMovies] = useState([]);
  const [isFavMovies, setIsFavMovies] = useState(false);
  return (
    <div className="App" style={{ position: "relative" }}>
      <Navbar />
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <Home
                favMovies={favMovies}
                isFavMovies={isFavMovies}
                setFavMovies={setFavMovies}
                setIsFavMovies={setIsFavMovies}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favMovies={favMovies}
                isFavMovies={isFavMovies}
                setFavMovies={setFavMovies}
                setIsFavMovies={setIsFavMovies}
              />
            }
          />
        </Route>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
