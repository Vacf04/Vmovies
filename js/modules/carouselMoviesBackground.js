export default function initCarouselMoviesBackground() {
  const controls = document.querySelectorAll(".control-button");
  const slide = document.querySelector(".now-playing-movies-carousel");
  let changeEvent = new Event("changeEvent");
  let indexSlide = 0;
  let timer;

  function changeSlide(index, animation = true, setClassIndex = index) {
    animation
      ? (slide.style.transition = "0.3s")
      : (slide.style.transition = "none");
    indexSlide = index;
    slide.style.setProperty("--slide-index", index);
    if (index <= 2) {
      controls.forEach((control) => {
        control.classList.remove("active");
      });
      controls[setClassIndex].classList.add("active");
    }
    setTimeout(() => {
      slide.dispatchEvent(changeEvent);
    }, 300);
  }

  function autoPlay() {
    timer = setInterval(() => {
      if (indexSlide > 3) {
        indexSlide = 0;
        return;
      }
      indexSlide++;
      changeSlide(indexSlide, true);
    }, 4000);
  }

  function cloneFirstSlide() {
    const firstSlide = slide.children[0];
    const firstSlideCloned = firstSlide.cloneNode(true);
    slide.appendChild(firstSlideCloned);
  }

  function onTransitionEnd() {
    if (indexSlide === slide.children.length - 1) {
      changeSlide(0, false, 0);
      indexSlide = 0;
    }
  }

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      changeSlide(index);
    });
  });

  controls.forEach((control) => {
    control.addEventListener("mouseenter", () => {
      clearInterval(timer);
    });
  });

  controls.forEach((control) => {
    control.addEventListener("mouseleave", () => {
      autoPlay();
    });
  });

  slide.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  slide.addEventListener("mouseleave", function () {
    autoPlay();
  });

  slide.addEventListener("changeEvent", onTransitionEnd);

  autoPlay();
  cloneFirstSlide();
}
