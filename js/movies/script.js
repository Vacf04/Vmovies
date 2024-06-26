import initMoviesPage from "./modules/initMoviesPage.js";
import initMenuMobile from "../utilities/menuMobile.js";
import AUTORIZATION from "../utilities/autorization.js";
import initSearchFunction from "../utilities/initSearchFunction.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTORIZATION,
  },
};

initMenuMobile();
initMoviesPage();
initSearchFunction(options);
