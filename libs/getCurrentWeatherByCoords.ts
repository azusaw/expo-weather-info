import { Coords } from "@/types";
import { fetchOpenMeteoWeather } from "@/libs/fetchOpenMeteoWeather";
import { CurrentWeather } from "@/types/CurrentWeather";

type CurrentWeatherResponse = {
  time: string;
  weather_code: number;
  temperature_2m: number;
  rain: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
};

export const getCurrentWeatherByCoords = async (
  coords: Coords,
): Promise<CurrentWeather> =>
  await fetchOpenMeteoWeather(coords, {
    forecast_days: 7,
    current: [
      "weather_code",
      "temperature_2m",
      "rain",
      "wind_speed_10m",
      "relative_humidity_2m",
    ].join(","),
  })
    .then((res) => res?.data.current as CurrentWeatherResponse)
    .then(
      (data) =>
        data &&
        ({
          time: data.time,
          weatherCode: data.weather_code,
          temperature: data.temperature_2m,
          rain: data.rain,
          windSpeed: data.wind_speed_10m,
          humidity: data.relative_humidity_2m,
        } as CurrentWeather),
    );
