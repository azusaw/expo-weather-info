import fs from "fs/promises";
import axios from "axios";
import path from "node:path";
import { Coords } from "@/types";
import { Cities } from "./constants/Cities";

const GEO_CODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const filePath = path.resolve(__dirname, "assets/json/city-location.json");

const getCoordsByCityName = async (cityName: string): Promise<Coords> =>
  await axios
    .get(GEO_CODING_URL, {
      params: {
        name: cityName,
        count: 1,
      },
    })
    .then((res) => ({
      latitude: res.data.results[0].latitude,
      longitude: res.data.results[0].longitude,
    }));

async function saveCityCoordsData() {
  const results: { name: string; coords: Coords }[] = [];
  try {
    for (const city of Cities) {
      await getCoordsByCityName(city).then((coords) =>
        results.push({
          name: city,
          coords,
        }),
      );
    }
  } catch (err) {
    console.error("Failed to get coords from Meteo API:", err);
  }
  try {
    await fs.writeFile(filePath, JSON.stringify(results, null, 2), {
      encoding: "utf-8",
    });
  } catch (err) {
    console.error("Failed to write file:", err);
  }
}
// For generating city-location.json in ./assets/json
saveCityCoordsData();
