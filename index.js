const WKT = require("terraformer-wkt-parser");
const fs = require("fs");
const csvtojson = require("csvtojson");

const SPOT_TYPES = {
  Retail: 13,
  Oficina: 11,
  Industrial: 9,
  Terreno: 15,
};

const convertCSVtoJSON = async (csvFilePath) => {
  try {
    const dataArray = await csvtojson().fromFile(csvFilePath);

    const geoJSONData = dataArray.map((item) => {
      try {
        const geometry = WKT.parse(item.geometry);

        return {
          name: item["Name"],
          SpotType: item["SpotType"],
          spot_type_id: SPOT_TYPES[item["SpotType"]],
          geometry,
          // @ts-ignore
          poligons: geometry?.coordinates[0],
          state: item["State"],
          municipality: item["Municipio"],
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
