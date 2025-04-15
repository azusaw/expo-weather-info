import { WeatherCodeDetail } from "@/types";
import WeatherCodeDesc from "@/constants/weather-code-desc.json";

export const getWeatherDetailFromCode = (
  weatherCode: number,
): WeatherCodeDetail =>
  // @ts-ignore use only day information for now
  WeatherCodeDesc[`${weatherCode}`].day;
