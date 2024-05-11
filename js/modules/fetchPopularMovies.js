import { options } from "../script.js";
export default function initFetchPopularMovies() {
  async function fetchPopularMovies() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
        options
      );
      const data = await response.json();
      const dataResults = data.results;
      return dataResults;
    } catch (error) {
      console.error(error);
    }
  }

  function verifyLengthOfTitle(title) {
    return title.length >= 20 ? `${title.slice(0, 20).trim()}...` : title;
  }

  async function displayPopularMovies() {
    try {
      const popularMovies = await fetchPopularMovies();
      const popularMoviesDiv = document.querySelector(".popular-movies-slide");
      popularMovies.forEach((item) => {
        popularMoviesDiv.innerHTML += `
        <li class="movie-card">
          <img class="movie-card-poster" src="https://image.tmdb.org/t/p/w500/${
            item.poster_path
          }">
          <a href="/" class="movie-card-title" title="${
            item.title
          }">${verifyLengthOfTitle(item.title)}</a>
          <div class="star-rating">
          <span>${item.vote_average.toFixed(1)}</span>
          </div>
        </li>`;
      });
    } catch (error) {
      console.error("Erro ao exibir os filmes populares:", error);
    }
  }

  displayPopularMovies();
}
