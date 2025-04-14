import axios from "axios";
import { Coords, DailyWeather } from "@/types";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeatherByCoords = async (
  { latitude, longitude }: Coords,
  options?: [],
): Promise<DailyWeather> =>
  //TODO: handle error later (in interceptor or here)
  await axios
    .get(OPEN_METEO_URL, {
      params: {
        latitude,
        longitude,
        ...options,
        forecast_days: 1,
        daily: [
          "weather_code",
          "temperature_2m_min",
          "temperature_2m_max",
        ].join(","),
        timezone: "GMT",
      },
    })
    .then((res) => res.data.daily);
