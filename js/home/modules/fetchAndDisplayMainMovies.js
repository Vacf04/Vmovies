import initCarouselMoviesBackground from "./carouselMainMovies.js";
import FetchAndDisplayMoviesCarousel from "../../utilities/FetchAndDisplayCarousel.js";

export default class FetchAndDisplayMainMoviesCarousel extends FetchAndDisplayMoviesCarousel {
  constructor(url, carousel, options) {
    super();
    this.fetchUrl = url;
    this.carousel = document.querySelector(carousel);
    this.options = options;
  }

  async displayMovies() {
    try {
      const popularMovies = await this.fetchMovies();
      popularMovies.slice(0, 3).forEach((item) => {
        this.carousel.innerHTML += `
        <div class="movie"  style="
        background: url(https://image.tmdb.org/t/p/original/${item.backdrop_path});
        background-size: cover;
        background-position: center;">
        <div class="movie-bg">
            <div class="movie-content">
              <h1 class="movie-title">
              ${item.title}
              </h1>
              <a class="movie-info button" href="/movie_info.html?movie=${item.id}">Mais Informações</a>
              </div>
            </div>
          </div>`;
      });
      initCarouselMoviesBackground();
    } catch (error) {
      return;
    }
  }
}
