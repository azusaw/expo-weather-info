import { AxiosResponse } from "axios";
import { axiosInstance } from "@/api/axios";
import { Coords } from "@/types";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchOpenMeteoWeather = async (
  { latitude, longitude }: Coords,
  options?: {},
): Promise<AxiosResponse | void> =>
  await axiosInstance.get(OPEN_METEO_URL, {
    params: {
      latitude,
      longitude,
      ...options,
      timezone: "GMT",
    },
  });
