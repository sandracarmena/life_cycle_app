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
  erreur,
  overallScore,
} from "./dom.js";

export async function fetchUrl() {
  let inputValue = input.value.toLowerCase().trim();
  inputValue = inputValue.replace(/\s+/g, "%20");
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
  erreur.innerHTML =
    "City not recognized or not present, please try again !" +
    " Remember that your city should be written in English.";
  setTimeout(() => {
    erreur.innerHTML = "";
  }, 3000);
}

button.addEventListener("click", async function () {
  let originalInputValue = input.value;
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  let response = await fetchUrl();
  let city = new City(response);

  paragraph.innerHTML =
    "About " +
    originalInputValue.charAt(0).toUpperCase() +
    originalInputValue.slice(1);
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

  function overallScoreFunction() {
    let sum = 0;
    let categoryCount = 0;

    for (let i = 0; i < city.categories.length; i++) {
      if (city.categories[i].score && city.categories[i].score !== null) {
        sum += Number(city.categories[i].score);
        categoryCount++;
      }
    }

    let overallScore = Math.round(sum / categoryCount);
    return overallScore;
  }

  let overall = overallScoreFunction();
  overallScore.innerHTML = overall + "/10";

  console.log(overall);
});

document
  .querySelector('input[type="text"]')
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      button.click();
    }
  });
