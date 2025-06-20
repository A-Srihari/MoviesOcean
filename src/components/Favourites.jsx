import "../styles/FavMovies.css";
import { ToastContainer, toast } from "react-toastify";

function Favourites(props) {
  const favMovies = JSON.parse(localStorage.getItem("favMovies")) || [];

  const handleRemoveFavourite = (movieId) => {
    const updatedFavMovies = favMovies.filter((movie) => movie.id !== movieId);
    localStorage.setItem("favMovies", JSON.stringify(updatedFavMovies));
    props.setFavMovies(updatedFavMovies);
    props.setIsFavMovies(updatedFavMovies.length > 0);
    toast.success(`Movie removed from favourites`);
  };

  return (
    <div>
      <h1>Favourite Movies</h1>
      {favMovies.length > 0 ? (
        <div className="favourites-list">
          {favMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div style={{ width: "300px" }} className="movie-poster">
                <img
                  style={{ width: "100%" }}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "image.png"
                  }
                  alt={movie.title}
                />
                <br />
                <button
                  onClick={() => handleRemoveFavourite(movie.id)}
                  style={{ width: "30px", height: "40px", borderRadius: "50%" }}
                  className="movie-overlay"
                >
                  ❤️
                </button>
              </div>
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favourite movies found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Favourites;
