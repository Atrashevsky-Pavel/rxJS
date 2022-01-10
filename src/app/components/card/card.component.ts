import {Component, Input, OnInit} from '@angular/core';
import {CityInterface} from '../../interfaces/weatherStateInterface';
import {Store} from '@ngrx/store';
import {ActionWeatherDeleteCity, selectorWeatherGetTimer} from '../../../store/reducers/weather.reducer';
import {GetWeatherIconService} from '../../services/weather/get-weather-icon.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: CityInterface;
  classWeather = '';
  timer = false;
  constructor(private store$: Store, private getWeatherIconService: GetWeatherIconService) {
    this.store$.select(selectorWeatherGetTimer).subscribe(check => {
      this.timer = check;
    });
  }
  ngOnInit(): void {
    this.classWeather = this.getWeatherIconService.getClass(this.card.weather?.weather, this.card.weather?.clouds);
  }

  deleteCity(id: number): void {
    const check = confirm('Are you sure?');
    if (check) {
      this.store$.dispatch(ActionWeatherDeleteCity({id}));
    }
  }
}
