import { Coords } from "@/types";
import { fetchOpenMeteo } from "@/libs/fetchOpenMeteo";
import { CurrentWeather } from "@/types/CurrentWeather";

type CurrentWeatherResponse = {
  time: string;
  weather_code: number;
  temperature_2m: number;
  wind_speed_10m: number;
};

export const getCurrentWeatherByCoords = async (
  coords: Coords,
): Promise<CurrentWeather> =>
  await fetchOpenMeteo(coords, {
    forecast_days: 7,
    current: ["weather_code", "wind_speed_10m"].join(","),
  })
    .then((res) => res?.data.current as CurrentWeatherResponse)
    .then(
      (data) =>
        data &&
        ({
          time: data.time,
          weatherCode: data.weather_code,
          temperature: data.temperature_2m,
          windSpeed: data.wind_speed_10m,
        } as CurrentWeather),
    );
