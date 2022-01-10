import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataCitiesInterface} from '../../interfaces/dataCitiesInterface';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetCitiesAutocompleteService {
  get(city: string): Observable<Array<DataCitiesInterface>> {
    return this.http
      .get<Array<DataCitiesInterface>>(`http://autocomplete.travelpayouts.com/places2?term=${city}&locale=en&types[]=city`);
  }
  constructor(private http: HttpClient) { }
}
