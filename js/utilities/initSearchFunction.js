import debounce from "../utilities/debounce.js";
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
  const seeAllResultsButton = createSeeAllResultsButton();
  const seeAllResultsButtonMobile = createSeeAllResultsButton();

  function createSeeAllResultsButton() {
    const button = document.createElement("li");
    button.classList.add("result-container");
    return button;
  }

  async function fetchMovie(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`,
        options
      );
      const movieDataJson = await response.json();
      return movieDataJson.results;
    } catch (e) {
      return [];
    }
  }

  async function searchMovie(e, mobile) {
    e.preventDefault();
    const [input, results, buttonAllResults] = mobile
      ? [searchInputMobile, someResultsMobile, seeAllResultsButtonMobile]
      : [searchInput, someResults, seeAllResultsButton];
    results.classList.add("active");
    input.classList.add("active");
    results.innerHTML = "<p class='loading-search'>Loading...</p>";
    let query = input.value;
    const moviesDataJson = await fetchMovie(query);
    results.innerHTML = "";
    moviesDataJson.slice(0, 10).forEach((movie) => {
      results.innerHTML += `<li class='result-container'><a href="/movie_info.html?movie=${movie.id}" style="display: block;">${movie.title}</a></li>`;
    });
    buttonAllResults.innerHTML = `<a style="display: block; cursor: pointer;">Veja todos os resultados para '${query}'</a>`;
    results.appendChild(buttonAllResults);
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
    const query = mobile ? searchInputMobile.value : searchInput.value;
    window.location = `/movies_result_page.html?query=${query}`;
  }

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      searchMovie(e, false);
    }, 300)
  );
  form.addEventListener("submit", (e) => {
    showResultsPage(e, false);
  });
  seeAllResultsButton.addEventListener("click", (e) => {
    showResultsPage(e, false);
  });
  searchButtonMobile.addEventListener("click", showInput);
  searchInputMobile.addEventListener(
    "input",
    debounce((e) => {
      searchMovie(e, true);
    }, 300)
  );
  formMobile.addEventListener("submit", (e) => {
    showResultsPage(e, true);
  });
  seeAllResultsButtonMobile.addEventListener("click", (e) => {
    showResultsPage(e, true);
  });
  window.addEventListener("click", displayNoneToSomeResults);
}
