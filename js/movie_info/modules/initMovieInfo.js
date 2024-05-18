import { options } from "../script.js";
import initRecommendedMoviesCarousel from "./initRecommendedMovies.js";
export default function initMovieInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("movie");

  const movieSectionBg = document.querySelector(".movie-infos");
  const movieSection = document.querySelector(".movie-info-content");

  async function fetchMovie() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        options
      );
      const movieDataJson = await response.json();
      return movieDataJson;
    } catch (e) {
      movieSection.innerHTML = "<p>Filme não encontrado.</p>";
      return;
    }
  }

  async function getMovietrailer() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-BR`,
        options
      );
      const movieVideosJson = await response.json();
      const movieVideosJsonResults = movieVideosJson.results;
      if (movieVideosJsonResults.length < 1) {
        return "";
      }
      let trailerCode;
      for (let i = 0; i <= movieVideosJsonResults.length; i++) {
        if (movieVideosJsonResults[i].type === "Trailer") {
          trailerCode = movieVideosJsonResults[i].key;
          break;
        }
      }
      const trailerLink = `https://www.youtube.com/watch?v=${trailerCode}`;
      return trailerLink;
    } catch (e) {
      return "";
    }
  }

  function convertToHours(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  function hideWatchTrailerButton() {
    const button = document.querySelector(".watch-trailer-button");
    if (button.getAttribute("href") === "") {
      button.style.display = "none";
    }
  }

  function loading() {
    movieSectionBg.style.display = "none";
    document.documentElement.style.overflow = "hidden";
    movieSection.innerHTML = "<div class='loading'></div>";
  }

  async function displayMovieInfo() {
    loading();
    document.documentElement.style.overflow = "auto";
    movieSectionBg.style.display = "block";
    const movieDataJson = await fetchMovie();

    movieSectionBg.style.setProperty(
      "--background-url",
      `url(https://image.tmdb.org/t/p/original/${movieDataJson.backdrop_path})`
    );
    movieSection.innerHTML = `
    <div class="movie-info-image">
    <img class="movie-info-poster" src="${
      movieDataJson.poster_path === null
        ? "https://fakeimg.pl/342x500/ffffff/000000?text=Not+Found&font=bebas"
        : `https://image.tmdb.org/t/p/w342/${movieDataJson.poster_path}`
    }"alt="poster do filme ${movieDataJson.title}">
    </div>
    
    <h1 class="movie-info-title">${movieDataJson.title}</h1>
    <div class="movie-info-dates">
    <div class="movie-info-categories">${movieDataJson.genres
      .map((genre) => {
        return `<span class='movie-info-categorie'>${genre.name}</span>`;
      })
      .join("\r\n")}</div>
    <div class="movie-details">
    <p class="movie-score"><img src="../../img/star-icon.svg">${movieDataJson.vote_average.toFixed(
      1
    )}/10</p>
    <p class="movie-date">${movieDataJson.release_date}</p>
    <p class="movie-duration">${
      movieDataJson.runtime > 0 ? convertToHours(movieDataJson.runtime) : ""
    }</p>
    </div>
    <p class="movie-overview">${
      movieDataJson.overview.length >= 1
        ? movieDataJson.overview
        : `Sinopse não encontrada.`
    }</p>
    <a class="watch-trailer-button" href="${await getMovietrailer()}" target="_blank">Assistir o Trailer</a>
      </div>
    
    `;

    hideWatchTrailerButton();
    initRecommendedMoviesCarousel(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=pt-BR&page=1`
    );
  }

  displayMovieInfo();
}
