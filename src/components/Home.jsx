import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import MovieCard from "./MovieCard";
import { searchMovies, getPopularMovies } from "../api's/api";
function Home({ favMovies, isFavMovies, setIsFavMovies, setFavMovies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const liked = "🤍";

  const handleFavourites = (movie) => {
    console.log("Set movie as favourite:", movie);
    if (favMovies.some((favMovie) => favMovie.id === movie.id)) {
      toast(`${movie.title} is already in favourites!`);
      return;
    }
    setFavMovies((prevFavMovies) => [...prevFavMovies, movie]);
    setIsFavMovies(true);
    toast.success(`${movie.title} added to favourites!`);
    localStorage.setItem("favMovies", JSON.stringify([...favMovies, movie]));
    console.log("Updated favourites:", [...favMovies, movie]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const searchForMovies = searchMovies(searchTerm);
      setMovies(await searchForMovies);
      setError(null);
      console.log("Search results:", searchForMovies);
    } catch (error) {
      setError(error);
      console.error("Error searching for movies:", error);
    } finally {
      setLoading(false);
      console.log("Search completed");
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        console.log(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
        console.log("Popular movies fetched successfully");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <form
        style={{
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          padding: "10px",
          columnGap: "10px",
          rowGap: "10px",
          flexWrap: "wrap",
        }}
        onSubmit={handleSearch}
        className="search-form"
      >
        <input
          style={{
            width: "300px",
            maxWidth: "800px",
            minWidth: "300px",
            paddingLeft: "10px",
            font: "16px Arial, sans-serif",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div
        className="movies-grid"
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {error && (
          <div className="error-message">
            {error.message || "An error occurred while fetching movies."}
          </div>
        )}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          movies.map((movies) => (
            <MovieCard
              liked={liked}
              title={movies.title}
              key={movies.id}
              onClick={() => handleFavourites(movies)}
              isFavMovies={isFavMovies}
              setFavMovies={setFavMovies}
              setIsFavMovies={setIsFavMovies}
              poster_path={movies.poster_path}
              release_date={movies.release_date?.split("-")[0] || "Unknown"}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
