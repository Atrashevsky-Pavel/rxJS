import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import {WEATHER_KEY, weatherReducer} from './reducers/weather.reducer';
import {WeatherStateInterface} from '../app/interfaces/weatherStateInterface';


export interface State {
  [WEATHER_KEY]: WeatherStateInterface;
}

export const reducers: ActionReducerMap<State> = {
  [WEATHER_KEY]: weatherReducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
