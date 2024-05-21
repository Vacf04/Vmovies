import { options } from "../script.js";
export default function initShowResults() {
  const moviesDiv = document.querySelector(".all-movies-content");
  const leftPage = document.querySelector(".page-left");
  const rightPage = document.querySelector(".page-right");
  const firstPageButton = document.querySelector(".first-page");
  const lastPageButton = document.querySelector(".last-page");
  const pagesButtons = document.querySelectorAll(".pages span");
  const pageSelector = document.querySelector(".page-selector");
  const pageTitle = document.querySelector(".search-title");
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  let lastPage = 500;
  let page = 1;

  async function fetchMovies() {
    try {
      let fetchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=${page}`;
      const response = await fetch(fetchUrl, options);
      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function displayMovies() {
    try {
      console.log("oxi");
      loading();
      const moviesData = await fetchMovies();
      pageTitle.innerText = `Pesquisar "${query}"`;
      const movies = moviesData.results;
      document.documentElement.style.overflow = "auto";
      if (movies.length < 1) {
        moviesDiv.innerHTML = `<p>Não foram encontrados filmes.`;
        moviesDiv.classList.add("not-founded");
        return;
      }
      if (moviesDiv.classList.contains("not-founded"))
        moviesDiv.classList.remove("not-founded");
      lastPage = moviesData.total_pages >= 500 ? 500 : moviesData.total_pages;
      pageSelector.style.display = "flex";
      clearDiv();
      movies.forEach((item) => {
        moviesDiv.innerHTML += `
          <a href="/movie_info.html?movie=${item.id}" class="movie-card">
            <img loading="lazy" class="movie-card-poster" src="${
              item.poster_path === null
                ? "../../img/movie_placeholder.png"
                : `https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`
            }" alt="poster do filme ${item.title}">
            <div class="star-rating">
            <span>${item.vote_average.toFixed(1)}</span>
            </div>
            <p class="movie-card-title" title="${item.title}">${item.title}</p>
           
          </a>`;
      });
      updatePageSelector();
    } catch (error) {
      moviesDiv.innerHTML = `Ops, não foram encontrados filmes.`;
    }
  }

  function goToNextPage() {
    if (page >= 500) return;
    let pageToGo = page + 1;
    goToPage(pageToGo);
  }

  function goToPrevPage() {
    if (page <= 1) return;
    let pageToGo = page - 1;
    goToPage(pageToGo);
  }

  function clearDiv() {
    moviesDiv.innerHTML = "";
    const movies = document.querySelectorAll(".all-movies-content .movie-card");
    movies.forEach((child) => {
      child.remove();
    });
  }

  function loading() {
    pageSelector.style.display = "none";
    document.documentElement.style.overflow = "hidden";
    moviesDiv.innerHTML = "<div class='loading'></div>";
  }

  function updatePageSelector() {
    if (page > 1) {
      leftPage.classList.remove("disable");
      pagesButtons[0].classList.remove("disable");
      firstPageButton.classList.remove("disable");
    } else {
      leftPage.classList.add("disable");
      pagesButtons[0].classList.add("disable");
      firstPageButton.classList.add("disable");
    }
    if (page >= lastPage) {
      rightPage.classList.add("disable");
      pagesButtons[2].classList.add("disable");
      lastPageButton.classList.add("disable");
    } else {
      rightPage.classList.remove("disable");
      pagesButtons[2].classList.remove("disable");
      lastPageButton.classList.remove("disable");
    }
    pagesButtons[0].textContent = page - 1;
    pagesButtons[1].textContent = page;
    pagesButtons[2].textContent = page + 1;
  }

  function goToPage(number) {
    page = number;
    displayMovies();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }

  lastPageButton.addEventListener("click", () => {
    goToPage(lastPage);
  });
  firstPageButton.addEventListener("click", () => {
    goToPage(1);
  });
  pagesButtons.forEach((pageButton) => {
    pageButton.addEventListener("click", () => {
      goToPage(+pageButton.textContent);
    });
  });
  rightPage.addEventListener("click", goToNextPage);
  leftPage.addEventListener("click", goToPrevPage);
  window.addEventListener("load", displayMovies);
}