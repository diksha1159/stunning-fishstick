const fs = require("fs");

async function makeHTML(source, dest, data, mapArr) {
  try {
    // Read the index.html file
    let html = fs.readFileSync("index.html", "utf-8");

    // Replace the source and destination placeholders in the HTML
    let newHtml = html.replace("{%Source%}", source);
    newHtml = newHtml.replace("{%Destination%}", dest);

    // Create the HTML for route details
    let routeHtml = `Total time : ${mapArr[0]}<br>Total distance : ${mapArr[1]}<br>Route : ${mapArr[2]}<br>${mapArr[3]}`;

    // Replace the route details placeholder in the HTML
    newHtml = newHtml.replace("{%ROUTE_DETAILS%}", routeHtml);

    // Create the HTML for Uber fare details
    let uberHtml = "";
    for (let i = 0; i < 5; i++) {
      if (data[0].Details[i]) {
        let price = data[0].Details[i].Fare;
        uberHtml += `<p>${price}</p>`;
      }
    }

    // Replace the Uber fare details placeholder in the HTML
    newHtml = newHtml.replace("{%UBER_VALUES%}", uberHtml);

    // Create the HTML for Ola fare details
    let olaHtml = "";
    for (let i = 0; i < 5; i++) {
      if (data[1].Details[i]) {
        let price = data[1].Details[i].Fare;
        olaHtml += `<p>${price}</p>`;
      }
    }

    // Replace the Ola fare details placeholder in the HTML
    newHtml = newHtml.replace("{%OLA_VALUES%}", olaHtml);

    // Create the HTML for Meru fare details
    let meruHtml = "";
    for (let i = 0; i < 5; i++) {
      if (data[2].Details[i]) {
        let price = data[2].Details[i].Fare;
        meruHtml += `<p>${price}</p>`;
      }
    }

    // Replace the Meru fare details placeholder in the HTML
    newHtml = newHtml.replace("{%MERU_VALUES%}", meruHtml);

    // Write the modified HTML back to the index.html file
    fs.writeFileSync("index.html", newHtml);

    console.log("HTML file generated successfully.");
  } catch (error) {
    console.error("Error generating HTML file:", error);
  }
}

module.exports.makeHTML = makeHTML;
