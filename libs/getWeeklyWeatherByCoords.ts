import { Coords, DailyWeather } from "@/types";
import { fetchOpenMeteo } from "@/libs/fetchOpenMeteo";

type WeeklyWeatherResponse = {
  time: string[];
  weather_code: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
};

export const getWeeklyWeatherByCoords = async (
  coords: Coords,
): Promise<DailyWeather[]> =>
  await fetchOpenMeteo(coords, {
    forecast_days: 7,
    daily: ["weather_code", "temperature_2m_min", "temperature_2m_max"].join(
      ",",
    ),
  })
    .then((res) => res?.data.daily as WeeklyWeatherResponse)
    .then(
      (data) =>
        data?.time.map((_, idx) => ({
          time: data.time[idx],
          weatherCode: data.weather_code[idx],
          temperatureMin: data.temperature_2m_min[idx],
          temperatureMax: data.temperature_2m_max[idx],
        })) as DailyWeather[],
    );
