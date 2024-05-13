import { options } from "../script.js";
import initCarouselMainMovies from "./carouselMainMovies.js";
export default class FetchAndDisplayMainMoviesCarousel {
  constructor(url, carousel) {
    this.fetchUrl = url;
    this.carousel = document.querySelector(carousel);
  }

  async fetchMovies() {
    try {
      const response = await fetch(this.fetchUrl, options);
      const data = await response.json();
      const dataResults = data.results;
      return dataResults;
    } catch (error) {
      console.error(error);
    }
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
              <a class="movie-info button" href="/movie.html/${item.id}">Mais Informações</a>
              </div>
            </div>
          </div>`;
      });
      initCarouselMainMovies();
    } catch (error) {
      console.error("Erro ao exibir os filmes:", error);
    }
  }
}