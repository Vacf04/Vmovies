import initMenuMobile from "../utilities/menuMobile.js";
import AUTORIZATION from "../utilities/autorization.js";
import initSearchFunction from "../utilities/initSearchFunction.js";
import initShowResults from "./modules/initShowResults.js";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTORIZATION,
  },
};

initMenuMobile();
initSearchFunction(options);
initShowResults();
