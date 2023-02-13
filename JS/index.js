import _ from "lodash";
import axios from "axios";
import City from "./city.js";
import ".././style.css";

import {
  input,
  paragraph,
  button,
  cityDescription,
  housing,
  travel,
  healthcare,
  education,
  livingCost,
  businessFreedom,
  economy,
  taxation,
  outdoors,
  environmentalQuality,
} from "./dom.js";

export async function fetchUrl() {
  let inputValue = input.value;
  let response;
  try {
    response = await axios.get(
      "https://api.teleport.org/api/urban_areas/slug:" + inputValue + "/scores/"
    );

    response = response.data;
    return response;
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", async function () {
  let inputValue = input.value;
  inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  let response = await fetchUrl();
  console.log(response.categories);

  paragraph.innerHTML = "About " + inputValue;

  let city = new City(response);

  cityDescription.innerHTML = city.summary;
  housing.innerHTML = city.categories[0].score;
  travel.innerHTML = city.categories[4].score;
  healthcare.innerHTML = city.categories[8].score;
  education.innerHTML = city.categories[9].score;
  livingCost.innerHTML = city.categories[1].score;
  startup.innerHTML = city.categories[2].score;
  Venture.innerHTML = city.categories[3].score;
  comute.innerHTML = city.categories[5].score;
  businessFreedom.innerHTML = city.categories[6].score;
  economy.innerHTML = city.categories[11].score;
  safety.innerHTML = city.categories[7].score;
  taxation.innerHTML = city.categories[12].score;
  internet.innerHTML = city.categories[13].score;
  culture.innerHTML = city.categories[14].score;
  tolerance.innerHTML = city.categories[15].score;
  outdoors.innerHTML = city.categories[16].score;
  environmentalQuality.innerHTML = city.categories[10].score;
});
