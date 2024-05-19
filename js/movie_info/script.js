import initMovieInfo from "./modules/initMovieInfo.js";
import initMenuMobile from "../utilities/menuMobile.js";
import AUTORIZATION from "../utilities/autorization.js";
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTORIZATION,
  },
};

initMenuMobile();
initMovieInfo();
