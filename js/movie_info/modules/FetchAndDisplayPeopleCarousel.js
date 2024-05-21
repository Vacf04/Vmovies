import CarouselMovies from "../../utilities/CarouselMovies.js";
import FetchAndDisplayMoviesCarousel from "../../utilities/FetchAndDisplayCarousel.js";
export default class FetchAndDisplayPeopleCarousel extends FetchAndDisplayMoviesCarousel {
  constructor(url, carousel, options, carouselSection) {
    super();
    this.fetchUrl = url;
    this.carousel = document.querySelector(carousel);
    this.options = options;
    this.carouselSection = document.querySelector(carouselSection);
  }

  loading() {
    this.carouselSection.style.display = "none";
    document.documentElement.style.overflow = "hidden";
  }

  async fetchMovies() {
    try {
      const response = await fetch(this.fetchUrl, this.options);
      const data = await response.json();
      return data.cast;
    } catch (error) {
      console.error(error);
    }
  }

  async displayMovies() {
    try {
      this.loading();
      const castJsonResults = await this.fetchMovies();
      if (castJsonResults.length < 1) {
        this.carouselSection.remove();
        return;
      }

      this.carouselSection.style.display = "block";
      document.documentElement.style.overflow = "auto";
      castJsonResults.forEach((people) => {
        this.carousel.innerHTML += `
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
      const carouselFunction = new CarouselMovies(
        ".people-slide",
        ".arrow-left-people",
        ".arrow-right-people"
      );

      carouselFunction.init();
    } catch (error) {
      console.error(error);
    }
  }
}
