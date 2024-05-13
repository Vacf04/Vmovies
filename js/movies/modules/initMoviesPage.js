import { options } from "../script.js";
export default function initMoviesPage() {
  const moviesDiv = document.querySelector(".all-movies-content");
  const leftPage = document.querySelector(".page-left");
  const rightPage = document.querySelector(".page-right");
  let page = 1;

  async function fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`,
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

  async function displayMovies(tradePage) {
    try {
      const movies = await fetchMovies();
      movies.forEach((item) => {
        moviesDiv.innerHTML += `
          <div class="movie-card">
            <img class="movie-card-poster" src="https://image.tmdb.org/t/p/w500/${
              item.poster_path
            }" alt="poster do filme ${item.title}">
            <a href="/" class="movie-card-title" title="${
              item.title
            }">${verifyLengthOfTitle(item.title)}</a>
            <div class="star-rating">
            <span>${item.vote_average.toFixed(1)}</span>
            </div>
          </div>`;
      });
    } catch (error) {
      console.error("Erro ao exibir os filmes: ", error);
    }
  }

  function nextPage() {
    if (page >= 500) return;
    page++;
    clearDiv();
    displayMovies(true);
    updateNumberOfPages();
  }

  function prevPage() {
    if (page <= 1) return;
    page--;

    clearDiv();

    displayMovies(true);
    updateNumberOfPages();
  }

  function clearDiv() {
    const movies = document.querySelectorAll(".all-movies-content .movie-card");
    movies.forEach((child) => {
      child.remove();
    });
  }

  function updateNumberOfPages() {
    const actualPage = document.querySelector(".actual-page");
    actualPage.textContent = page;
  }

  rightPage.addEventListener("click", nextPage);
  leftPage.addEventListener("click", prevPage);
  displayMovies();
}