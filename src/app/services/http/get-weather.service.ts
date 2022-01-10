import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataWeatherInterface} from '../../interfaces/dataWeatherInterface';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  get(body: {city: string}): Observable<DataWeatherInterface> {
    return this.http
      .get<DataWeatherInterface>(`https://api.openweathermap.org/data/2.5/weather?q=${body.city}&units=metric&appid=d0cffd83c194a528e2732435eb0f9c9b`);
  }
  constructor(private http: HttpClient) { }
}
