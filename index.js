const WKT = require("terraformer-wkt-parser");
const fs = require("fs");
const csvtojson = require("csvtojson");

const SPOT_TYPES = {
  Retail: 13,
  Oficina: 11,
  Industrial: 9,
  Terreno: 15,
};

function capitalizeWords(phrase) {
  var words = phrase.split(" ");
  var capitalizedWords = words.map(function (word) {
    // If the word is within parentheses, keep it in uppercase
    if (word.startsWith("(") && word.endsWith(")")) {
      return word.toUpperCase();
    }
    // If the word is a Roman numeral, keep it in uppercase
    if (/^[IVXLCDM]+$/i.test(word)) {
      return word.toUpperCase();
    }
    // Capitalize the first letter and convert the rest to lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

const convertCSVtoJSON = async (csvFilePath) => {
  try {
    const dataArray = await csvtojson().fromFile(csvFilePath);

    const geoJSONData = dataArray.map((item) => {
      try {
        const geometry = WKT.parse(item.geometry);

        return {
          geometry,
          state: capitalizeWords(item["Estado"]),
          spotType: item["SpotType"],
          municipality: capitalizeWords(item["Municipio"]),
          name: capitalizeWords(item["Name"]),
          spot_type_id: SPOT_TYPES[item["SpotType"]],
          // @ts-ignore
          polygon: geometry?.coordinates[0],
        };
      } catch (error) {
        console.error("Error parsing WKT to GeoJSON:", error);
        return item;
      }
    });

    const outputFileName = csvFilePath.replace(".csv", ".json");
    fs.writeFile(
      outputFileName,
      JSON.stringify(geoJSONData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log(
            `CSV file "${csvFilePath}" has been converted to GeoJSON successfully. Check "${outputFileName}"`
          );
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

convertCSVtoJSON("Corredores.csv");
