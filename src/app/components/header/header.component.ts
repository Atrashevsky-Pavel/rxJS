import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectorWeatherGetTimer} from '../../../store/reducers/weather.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() weatherStream: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() weatherStreamObservable: EventEmitter<boolean> = new EventEmitter<boolean>();
  timer = false;
  constructor(private store$: Store) {
    this.store$.select(selectorWeatherGetTimer).subscribe(check => {
      this.timer = check;
    });
  }

  switchModal(): void {
    this.showModal.emit(true);
  }

  startWeather(): void {
    this.weatherStream.emit(true);
  }
  startWeatherObservable(): void {
    this.weatherStreamObservable.emit(true);
  }

  endWeather(): void {
    this.weatherStream.emit(false);
  }
}
