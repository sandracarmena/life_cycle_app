export class City {
  constructor(details) {
    this.summary = details.summary;
    this.categories = details.categories.map((category) => {
      return {
        name: category.name,
        score: Number(category.score_out_of_10).toFixed(2),
      };
    });

    this.categories.push({
      name: "Overall score",
      score: Number(details.score_out_of_10).toFixed(2),
    });
  }
}

export default City;
