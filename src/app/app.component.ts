import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {CityInterface} from './interfaces/weatherStateInterface';
import {
  ActionWeatherUpdate, ActionWeatherUpdateObservable,
  ActionWeatherUpdateStop,
  selectorWeatherGetCities,
  selectorWeatherGetError
} from '../store/reducers/weather.reducer';
import {Store} from '@ngrx/store';
import {StorageService} from './services/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showModal = false;
  cities: Observable<CityInterface[]> = this.store$.select(selectorWeatherGetCities);

  yearOfDevelopment  = 2021;

  constructor(private store$: Store) {
    this.store$.select(selectorWeatherGetError).subscribe((error) => {
      if (error) {
        alert(error);
      }
    });
  }

  showModalChange(modal: boolean): void {
    this.showModal = modal;
  }

  weatherStream(start: boolean): void {
    if (start) {
      this.store$.dispatch(ActionWeatherUpdate());
    } else  {
      this.store$.dispatch(ActionWeatherUpdateStop());
    }
  }
  weatherStreamObservable(start: boolean): void {
    if (start) {
      this.store$.dispatch(ActionWeatherUpdateObservable());
    } else  {
      this.store$.dispatch(ActionWeatherUpdateStop());
    }
  }

  clearStorage(): void {
    StorageService.clearStorageCities();
  }
}
