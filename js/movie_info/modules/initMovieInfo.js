import { options } from "../script.js";
export default function initMovieInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("movie");

  async function fetchMovie() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
      options
    );
    const movieDataJson = await response.json();
    return movieDataJson;
  }

  async function displayMovieInfo() {
    const movieDataJson = await fetchMovie();
    console.log(movieDataJson);
    const movieSection = document.querySelector(".movie-info-content");

    movieSection.innerHTML = `
    <div class="movie-info-image">
    
    <h1>${movieDataJson.title}</h1>
    <img class="movie-card-poster" src="https://image.tmdb.org/t/p/w500/${
      movieDataJson.poster_path
    }" alt="poster do filme ${movieDataJson.title}">
    </div>
    <div class="movie-info-dates">
    <p>Descrição: ${movieDataJson.overview}</p>
    <p>Categorias: ${movieDataJson.genres
      .map((genre) => {
        return genre.name;
      })
      .join(", ")}</p>
      </div>
    
    `;
  }

  displayMovieInfo();
}
