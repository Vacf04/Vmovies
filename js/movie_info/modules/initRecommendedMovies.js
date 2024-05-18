import { options } from "../script.js";
import CarouselMovies from "../../home/modules/carouselMovies.js";
export default function initRecommendedMoviesCarousel(url) {
  const carousel = document.querySelector(".recommended-movies-slide");
  const carouselFunction = new CarouselMovies(
    ".recommended-movies-slide",
    ".arrow-left-recommended",
    ".arrow-right-recommended"
  );

  async function fetchMovies() {
    try {
      const response = await fetch(url, options);
      const moviesJson = await response.json();
      const moviesJsonResults = moviesJson.results;
      return moviesJsonResults;
    } catch (e) {
      console.log(e);
    }
  }

  function verifyLengthOfTitle(title) {
    return title.length >= 20 ? `${title.slice(0, 20).trim()}...` : title;
  }

  async function display() {
    const moviesJsonResults = await fetchMovies();
    moviesJsonResults.forEach((movie) => {
      carousel.innerHTML += `
      <li>
      <a class="movie-card"  href="/movie_info.html?movie=${movie.id}">
        <img class="movie-card-poster" src="https://image.tmdb.org/t/p/w500/${
          movie.poster_path
        }" alt="poster do filme ${movie.title}">
        <p class="movie-card-title" title="${
          movie.title
        }">${verifyLengthOfTitle(movie.title)}</p>
        <div class="star-rating">
        <span>${movie.vote_average.toFixed(1)}</span>
        </div>
      </a>
      </li>`;
    });
  }

  display();

  carouselFunction.init();
}
