import CarouselMovies from "./modules/carouselMovies.js";
import initMenuMobile from "./modules/menuMobile.js";
import FetchAndDisplayMainMoviesCarousel from "./modules/fetchAndDisplayMainMoviesCarousel.js";
import FetchAndDisplayMovies from "./modules/fetchAndDisplayMoviesCarousel.js";
import AUTORIZATION from "./autorization.js";

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
  ".main-movies-carousel"
);
fetchAndDisplayMainMoviesCarousel.displayMovies();

initMenuMobile();

// fetch and display popular movies on carousel

const fetchAndDisplayPopular = new FetchAndDisplayMovies(
  "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
  ".popular-movies-slide"
);

fetchAndDisplayPopular.displayMovies();
const carouselPopular = new CarouselMovies(
  ".popular-movies-slide",
  ".arrow-left-popular",
  ".arrow-right-popular"
);
carouselPopular.init();

// fetch and display top rated movies on carousel

const fetchAndDisplayTopRated = new FetchAndDisplayMovies(
  "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1",
  ".top-rated-movies-slide"
);

fetchAndDisplayTopRated.displayMovies();

const carouselTopRated = new CarouselMovies(
  ".top-rated-movies-slide",
  ".arrow-left-top-rated",
  ".arrow-right-top-rated"
);
carouselTopRated.init();
