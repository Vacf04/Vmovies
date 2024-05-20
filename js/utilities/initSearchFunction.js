export default function initSearchFunction(options) {
  const searchInput = document.querySelector(".search-movies");
  const searchInputMobile = document.querySelector(".search-movies-mobile");
  const form = document.querySelector(".form-search");
  const someResults = document.querySelector(".some-results");
  const someResultsMobile = document.querySelector(".some-results-mobile");
  const searchButtonMobile = document.querySelector(".search-button-mobile");
  const searchContainerMobile = document.querySelector(
    ".search-container-mobile"
  );
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

  async function searchMovie(mobile = false) {
    if (mobile) {
      const someResults = someResultsMobile;
      const searchInput = searchInputMobile;
      someResults.classList.add("active");
      searchInput.classList.add("active");
      someResults.innerHTML = "<p class='loading-search'>Loading...</p>";
      let query = searchInput.value;
      const moviesDataJson = await fetchMovie(query);
      if (moviesDataJson.length < 1) {
        someResults.innerHTML =
          "<p class='no-results-search'>Sem resultados</p>";
        return;
      }
      someResults.innerHTML = "";
      moviesDataJson.slice(0, 10).forEach((movie) => {
        someResults.innerHTML += `<a href="/movie_info.html?movie=${movie.id}" style="display: block;">${movie.title}</a>`;
      });
    } else {
      someResults.classList.add("active");
      searchInput.classList.add("active");
      someResults.innerHTML = "<p class='loading-search'>Loading...</p>";
      let query = searchInput.value;
      const moviesDataJson = await fetchMovie(query);
      if (moviesDataJson.length < 1) {
        someResults.innerHTML =
          "<p class='no-results-search'>Sem resultados</p>";
        return;
      }
      someResults.innerHTML = "";
      moviesDataJson.slice(0, 10).forEach((movie) => {
        someResults.innerHTML += `<a href="/movie_info.html?movie=${movie.id}" style="display: block;">${movie.title}</a>`;
      });
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

  searchInput.addEventListener("input", () => {
    searchMovie(false);
  });
  searchButtonMobile.addEventListener("click", showInput);
  searchInputMobile.addEventListener("input", () => {
    searchMovie(true);
  });
  window.addEventListener("click", displayNoneToSomeResults);
}
