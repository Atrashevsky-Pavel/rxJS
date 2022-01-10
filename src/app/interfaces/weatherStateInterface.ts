export interface WeatherCityInterface {
  temp: number;
  clouds: number
  weather: string | null;
  wind_speed: number;
}

export interface CityInterface {
  id: number;
  city: string;
  weather: WeatherCityInterface | null
}

export interface WeatherStateInterface {
  timer: boolean;
  errors: string | null;
  cities: Array<CityInterface> | [];
}
