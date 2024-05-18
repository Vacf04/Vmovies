import { options } from "../script.js";
import CarouselMovies from "../../home/modules/carouselMovies.js";
export default async function initRecommendedMoviesCarousel(url) {
  const carousel = document.querySelector(".recommended-movies-slide");
  const carouselFunction = new CarouselMovies(
    ".recommended-movies-slide",
    ".arrow-left-recommended",
    ".arrow-right-recommended"
  );

  const carouselSection = document.querySelector(
    ".movies-recommended-carousel"
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

  function loading() {
    carouselSection.style.display = "none";
    document.documentElement.style.overflow = "hidden";
  }

  async function display() {
    loading();
    const moviesJsonResults = await fetchMovies();
    if (moviesJsonResults.length < 5) {
      carouselSection.remove();
      return;
    }
    carouselSection.style.display = "block";
    document.documentElement.style.overflow = "auto";
    moviesJsonResults.forEach((movie) => {
      carousel.innerHTML += `
      <li>
      <a class="movie-card"  href="/movie_info.html?movie=${movie.id}">
        <img class="movie-card-poster" src="${
          movie.poster_path === null
            ? "https://fakeimg.pl/215x320/ffffff/000000?text=Not+Found&font=bebas"
            : `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
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
