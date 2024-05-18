import { options } from "../script.js";
export default class FetchAndDisplayMoviesCarousel {
  constructor(url, carouselDiv) {
    this.fetchUrl = url;
    this.carouselDiv = document.querySelector(carouselDiv);
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

  verifyLengthOfTitle(title) {
    return title.length >= 20 ? `${title.slice(0, 20).trim()}...` : title;
  }

  async displayMovies() {
    try {
      const popularMovies = await this.fetchMovies();
      popularMovies.forEach((item) => {
        this.carouselDiv.innerHTML += `
        <li>
        <a class="movie-card"  href="/movie_info.html?movie=${item.id}">
          <img class="movie-card-poster" src="${
            item.poster_path === null
              ? "https://fakeimg.pl/215x320/ffffff/000000?text=Not+Found&font=bebas"
              : `https://image.tmdb.org/t/p/w342/${item.poster_path}`
          }" alt="poster do filme ${item.title}">
          <p class="movie-card-title" title="${
            item.title
          }">${this.verifyLengthOfTitle(item.title)}</p>
          <div class="star-rating">
          <span>${item.vote_average.toFixed(1)}</span>
          </div>
        </a>
        </li>`;
      });
    } catch (error) {
      console.error("Erro ao exibir os filmes: ", error);
    }
  }
}
