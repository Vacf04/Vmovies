export default function initSearchFunction(options) {
  const searchInput = document.querySelector(".search-movies");
  const searchInputMobile = document.querySelector(".search-movies-mobile");
  const form = document.querySelector(".form-search");
  const formMobile = document.querySelector(".form-search-mobile");
  const someResults = document.querySelector(".some-results");
  const someResultsMobile = document.querySelector(".some-results-mobile");
  const searchButtonMobile = document.querySelector(".search-button-mobile");
  const searchContainerMobile = document.querySelector(
    ".search-container-mobile"
  );
  const seeAllResultsButton = document.createElement("li");
  seeAllResultsButton.classList.add("result-container");
  const seeAllResultsButtonMobile = document.createElement("li");
  seeAllResultsButtonMobile.classList.add("result-container");
  async function fetchMovie(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`,
        options
      );
      const movieDataJson = await response.json();
      return movieDataJson.results;
    } catch (e) {
      return;
    }
  }

  async function searchMovie(e, mobile) {
    e.preventDefault();
    if (mobile) {
      const someResults = someResultsMobile;
      const searchInput = searchInputMobile;
      someResults.classList.add("active");
      searchInput.classList.add("active");
      someResults.innerHTML = "<p class='loading-search'>Loading...</p>";
      let query = searchInput.value;
      const moviesDataJson = await fetchMovie(query);
      someResults.innerHTML = "";
      moviesDataJson.slice(0, 10).forEach((movie) => {
        someResults.innerHTML += `<li class='result-container'><a href="/movie_info.html?movie=${movie.id}" style="display: block;">${movie.title}</a></li>`;
      });

      seeAllResultsButtonMobile.innerHTML = `<a style="display: block;">Veja todos os resultados para '${query}'</a>`;
      someResults.appendChild(seeAllResultsButtonMobile);
    } else {
      someResults.classList.add("active");
      searchInput.classList.add("active");
      someResults.innerHTML = "<p class='loading-search'>Loading...</p>";
      let query = searchInput.value;
      const moviesDataJson = await fetchMovie(query);
      someResults.innerHTML = "";
      moviesDataJson.slice(0, 10).forEach((movie) => {
        someResults.innerHTML += `<li class='result-container'><a href="/movie_info.html?movie=${movie.id}" style="display: block;">${movie.title}</a></li>`;
      });
      seeAllResultsButton.innerHTML = `<a style="display: block; cursor: pointer;">Veja todos os resultados para '${query}'</a>`;
      someResults.appendChild(seeAllResultsButton);
    }
  }

  function displayNoneToSomeResults(e) {
    if (
      !e.target.matches(".search-movies") &&
      !e.target.matches(".some-results")
    )
      someResults.classList.remove("active");
    searchInput.classList.remove("active");
    if (
      !e.target.matches(".search-movies-mobile") &&
      !e.target.matches(".search-button-mobile") &&
      !e.target.matches(".search-button-mobile svg")
    ) {
      searchContainerMobile.classList.remove("active");
      someResultsMobile.classList.remove("active");
      searchInputMobile.classList.remove("active");
    }
  }

  function showInput() {
    searchContainerMobile.classList.add("active");
    searchInputMobile.focus();
  }

  function showResultsPage(e, mobile) {
    e.preventDefault();
    if (mobile) {
      let query = searchInputMobile.value;
      window.location = `/movies_result_page.html?query=${query}`;
    } else {
      let query = searchInput.value;
      window.location = `/movies_result_page.html?query=${query}`;
    }
  }

  searchInput.addEventListener("input", (e) => {
    searchMovie(e, false);
  });
  form.addEventListener("submit", (e) => {
    showResultsPage(e, false);
  });
  seeAllResultsButton.addEventListener("click", (e) => {
    showResultsPage(e, false);
  });
  searchButtonMobile.addEventListener("click", showInput);
  searchInputMobile.addEventListener("input", (e) => {
    searchMovie(e, true);
  });
  formMobile.addEventListener("submit", (e) => {
    showResultsPage(e, true);
  });
  seeAllResultsButtonMobile.addEventListener("click", (e) => {
    showResultsPage(e, true);
  });
  window.addEventListener("click", displayNoneToSomeResults);
}
