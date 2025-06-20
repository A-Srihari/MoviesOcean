function MovieCard(props) {
  return (
    <div className="movie-card">
      <div style={{ width: "300px" }} className="movie-poster">
        <img
          style={{ width: "100%" }}
          src={
            `https://image.tmdb.org/t/p/w500${props.poster_path}`
              ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
              : "image.png"
          }
          alt={props.title}
        />
        <br />
        <button
          onClick={props.onClick}
          style={{ width: "30px", height: "40px", borderRadius: "50%" }}
          className="movie-overlay"
        >
          {props.liked}
        </button>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{props.title}</h2>
        <p>{props.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
