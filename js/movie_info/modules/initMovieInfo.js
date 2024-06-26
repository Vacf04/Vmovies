import { options } from "../script.js";
import FetchAndDisplayPeopleCarousel from "./FetchAndDisplayPeopleCarousel.js";
import initRecommendedMoviesCarousel from "./initRecommendedMovies.js";
export default function initMovieInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("movie");

  const movieSectionBg = document.querySelector(".movie-infos");
  const movieSection = document.querySelector(".movie-info-content");

  if (!movieId) {
    movieSection.innerHTML = "Nenhum filme encontrado.";
    return;
  }

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
      const trailer = movieVideosJsonResults.find(
        (video) => video.type === "Trailer"
      );
      const trailerLink = `https://www.youtube.com/watch?v=${trailer.key}`;
      return trailerLink;
    } catch (e) {
      return "";
    }
  }

  function convertToHours(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    if (minutes < 10) minutes = "0" + minutes;
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
    <img decoding="sync" class="movie-info-poster" src="${
      movieDataJson.poster_path === null
        ? "../../img/movie_placeholder_main.png"
        : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDataJson.poster_path}`
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

    document.title = movieDataJson.title;

    hideWatchTrailerButton();
    initRecommendedMoviesCarousel(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=pt-BR&page=1`
    );
    const fetchAndDisplayPeople = new FetchAndDisplayPeopleCarousel(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-BR`,
      ".people-slide",
      options,
      ".people-carousel"
    );

    fetchAndDisplayPeople.displayMovies();
  }

  displayMovieInfo();
}
