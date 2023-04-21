const fs = require("fs");

async function makeGraph(data) {
  try {
    let template = fs.readFileSync("template.html", "utf-8");
    let chartData = [["Types", "Uber", "Ola", "Meru"]];

    let carTypes = ["Bike", "Auto", "Hatchback", "Sedan", "SUV"];
    for (let i = 0; i < carTypes.length; i++) {
      let newRow = [carTypes[i]];
      for (let j = 0; j < data.length; j++) {
        let fare = data[j].Details[i].Fare;
        if (fare === "NOT AVAILABLE") {
          newRow.push(0);
        } else {
          newRow.push(Number(fare));
        }
      }
      chartData.push(newRow);
    }

    let chartDataJson = JSON.stringify(chartData);
    let newHtml = template.replace("{DATA_VALUES}", chartDataJson);
    fs.writeFileSync("index.html", newHtml);

    console.log("Graph created successfully!");
  } catch (err) {
    console.error("Error creating graph: ", err);
  }
}

module.exports = { makeGraph };
