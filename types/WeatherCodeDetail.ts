type WeatherCodeDetail = {
  description: string;
  image: string;
};
export type WeatherCodeDetailDayNight = {
  day: WeatherCodeDetail;
  night: WeatherCodeDetail;
};
