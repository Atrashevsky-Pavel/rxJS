export interface DataWeatherInterface {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: {lon: number, lat: number};
  id: number;
  snow?: object;
  rain?: object;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_main: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{id: number; main: string; description: string; icon: string}>;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
