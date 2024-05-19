import CarouselMovies from "../utilities/CarouselMovies.js";
import initMenuMobile from "../utilities/menuMobile.js";
import FetchAndDisplayMainMoviesCarousel from "./modules/FetchAndDisplayMainMovies.js";
import FetchAndDisplayMoviesCarousel from "../utilities/FetchAndDisplayCarousel.js";
import AUTORIZATION from "../utilities/autorization.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTORIZATION,
  },
};

// fetch and display now playing movies in the main carousel of the page

const fetchAndDisplayMainMoviesCarousel = new FetchAndDisplayMainMoviesCarousel(
  "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
  ".main-movies-carousel",
  options
);
fetchAndDisplayMainMoviesCarousel.displayMovies();

initMenuMobile();

// fetch and display popular movies on carousel

const fetchAndDisplayPopular = new FetchAndDisplayMoviesCarousel(
  "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
  ".popular-movies-slide",
  options
);

fetchAndDisplayPopular.displayMovies();
const carouselPopular = new CarouselMovies(
  ".popular-movies-slide",
  ".arrow-left-popular",
  ".arrow-right-popular"
);
carouselPopular.init();

// fetch and display top rated movies on carousel

const fetchAndDisplayTopRated = new FetchAndDisplayMoviesCarousel(
  "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1",
  ".top-rated-movies-slide",
  options
);

fetchAndDisplayTopRated.displayMovies();

const carouselTopRated = new CarouselMovies(
  ".top-rated-movies-slide",
  ".arrow-left-top-rated",
  ".arrow-right-top-rated"
);
carouselTopRated.init();
