import debounce from "./debounce.js";
export default class CarouselMovies {
  constructor(carousel, arrowLeft, arrowRight) {
    this.carousel = document.querySelector(carousel);
    this.arrowLeft = document.querySelector(arrowLeft);
    this.arrowRight = document.querySelector(arrowRight);
  }

  scrollToLeft() {
    const elements = [...this.carousel.children];
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      const elementRect = element.getBoundingClientRect();
      const containerRect = this.carousel.getBoundingClientRect();
      let isLeftVisible = elementRect.left >= containerRect.left;

      if (!isLeftVisible) {
        element.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "end",
        });
        break;
      }
    }
  }

  scrollToRight() {
    const elements = [...this.carousel.children];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elementRect = element.getBoundingClientRect();
      const containerRect = this.carousel.getBoundingClientRect();
      let isRightVisible = elementRect.right <= containerRect.right;
      if (!isRightVisible) {
        element.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "start",
        });
        break;
      }
    }
  }

  addArrowEvent() {
    this.arrowLeft.addEventListener("click", this.scrollToLeft);
    this.arrowRight.addEventListener("click", this.scrollToRight);
    if (!this.isTouchDevice()) {
      this.carousel.addEventListener("scroll", this.verifyArrows);
    } else {
      this.arrowLeft.classList.add("disable");
      this.arrowRight.classList.add("disable");
    }
  }

  bindEvents() {
    this.scrollToLeft = this.scrollToLeft.bind(this);
    this.scrollToRight = this.scrollToRight.bind(this);
    this.verifyArrows = debounce(this.verifyArrows.bind(this), 50);
  }

  isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  verifyArrows() {
    const scrollUsed = this.carousel.scrollLeft + this.carousel.offsetWidth;
    if (scrollUsed == this.carousel.scrollWidth) {
      this.arrowRight.classList.add("disable");
    }
    if (this.carousel.scrollLeft <= 0) {
      this.arrowLeft.classList.add("disable");
    }
    if (this.carousel.scrollLeft > 0) {
      this.arrowLeft.classList.remove("disable");
    }
    if (scrollUsed < this.carousel.scrollWidth) {
      this.arrowRight.classList.remove("disable");
    }
  }

  init() {
    if (!this.carousel) return;
    this.isTouchDevice();
    this.bindEvents();
    this.addArrowEvent();
  }
}
