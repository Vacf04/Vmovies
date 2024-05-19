import { options } from "../script.js";
import CarouselMovies from "../../utilities/CarouselMovies.js";
import FetchAndDisplayMoviesCarousel from "../../utilities/FetchAndDisplayCarousel.js";
export default async function initRecommendedMoviesCarousel(url) {
  const carouselFunction = new CarouselMovies(
    ".recommended-movies-slide",
    ".arrow-left-recommended",
    ".arrow-right-recommended"
  );
  const fetchAndDisplayRecommendedMovies = new FetchAndDisplayMoviesCarousel(
    url,
    ".recommended-movies-slide",
    options
  );
  fetchAndDisplayRecommendedMovies.displayMovies();
  carouselFunction.init();
}
