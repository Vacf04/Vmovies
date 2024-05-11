export default function initMenuMobile() {
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".primary-nav");
  const html = document.querySelector("html");

  function onClickMenuButton() {
    menuButton.classList.toggle("active");
    menu.classList.toggle("active");
    html.style.overflow = "hidden";
    if (menu.classList.contains("active")) html.style.overflow = "hidden";
    else html.style.overflow = "auto";
  }

  menuButton.addEventListener("click", onClickMenuButton);
}
