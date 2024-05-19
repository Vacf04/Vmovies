import { options } from "../script.js";
import CarouselMovies from "../../home/modules/carouselMovies.js";
export default async function initPeopleCarousel(url) {
  const carousel = document.querySelector(".people-slide");
  const carouselFunction = new CarouselMovies(
    ".people-slide",
    ".arrow-left-people",
    ".arrow-right-people"
  );

  const carouselSection = document.querySelector(".people-carousel");

  async function fetchMovies() {
    try {
      const response = await fetch(url, options);
      const moviesJson = await response.json();
      return moviesJson.cast;
    } catch (e) {
      console.log(e);
    }
  }

  function loading() {
    carouselSection.style.display = "none";
    document.documentElement.style.overflow = "hidden";
  }

  async function display() {
    loading();
    const moviesJsonResults = await fetchMovies();
    console.log(moviesJsonResults);
    if (moviesJsonResults.length < 1) {
      carouselSection.remove();
      return;
    }
    carouselSection.style.display = "block";
    document.documentElement.style.overflow = "auto";
    moviesJsonResults.forEach((people) => {
      carousel.innerHTML += `
      <li>
      <a class="movie-card">
        <img class="movie-card-poster" src="${
          people.profile_path === null
            ? "../../img/user_placeholder.png"
            : `https://image.tmdb.org/t/p/w220_and_h330_face/${people.profile_path}`
        }" alt="foto do/a ${people.name}">
        <p class="movie-card-title" >${people.character}</p>
        <p>${people.name}</p>
      </a>
      </li>`;
    });
  }

  display();

  carouselFunction.init();
}
