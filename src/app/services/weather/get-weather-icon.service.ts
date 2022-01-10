import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class GetWeatherIconService {

  getClass(weather: string | undefined | null, clouds: number| undefined) : string {
    if (typeof weather === 'string') {
      switch (weather) {
        case 'snow':
          return 'fa fa-snowflake-o';
          break;
        case 'rain':
          return 'fa fa-tint';
          break;
        default:
          break;
      }
    }
    if (typeof clouds === 'number') {
      if (clouds < 50) {
        return 'fa fa-sun-o';
      } else {
        return 'fa fa-cloud';
      }
    }
    return 'fa fa-clock-o';
  }
  constructor() { }
}
