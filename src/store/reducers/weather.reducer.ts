import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props} from '@ngrx/store';
import {DataWeatherInterface} from '../../app/interfaces/dataWeatherInterface';
import {WeatherStateInterface} from '../../app/interfaces/weatherStateInterface';
import {StorageService} from '../../app/services/storage/storage.service';

export const WEATHER_KEY = 'weather';


export const ActionWeatherAddCity = createAction(
  '[WEATHER] add city',
  props<{city: string}>()
);
export const ActionWeatherDeleteCity = createAction(
  '[WEATHER] delete city',
  props<{id: number}>()
);


export const ActionWeatherUpdate = createAction(
  '[WEATHER] update'
);
export const ActionWeatherUpdateObservable = createAction(
  '[WEATHER] update observable'
);

export const ActionWeatherUpdateStop = createAction(
  '[WEATHER] update stop'
);



export const ActionWeatherUpdateOneSuccess = createAction(
  '[WEATHER] update one success',
  props<{data: DataWeatherInterface, id: number}>()
);
export const ActionWeatherUpdateError = createAction(
  '[WEATHER] update one failure',
  props<{error: string}>()
);

export const ActionWeatherTimerStart = createAction(
  '[WEATHER] timer start'
);
export const ActionWeatherTimerStop = createAction(
  '[WEATHER] timer stop'
);


const initialState: WeatherStateInterface = {
  timer: false,
  errors: null,
  cities: StorageService.getStorageCities()
};

export const weatherReducer = createReducer(
  initialState,
  on(ActionWeatherAddCity, (state, data) => ({
      ...state,
      cities: (() => {
        const id: number = +state.cities.length;
        if (state.cities.length === 0) {
          // tslint:disable-next-line:no-shadowed-variable
          const cities = [{id, city: data.city, weather: null}];
          StorageService.setStorageCities(cities);
          return cities;
        }
        const cities = [...state.cities, {id, city: data.city, weather: null}];
        StorageService.setStorageCities(cities);
        return cities;
      })()
    }
  )),

  on(ActionWeatherDeleteCity, (state, data) => ({
    ...state,
    cities: (() => {
      const cities = [...state.cities];
      const index = cities.findIndex((item) => item.id === data.id);
      cities.splice(index, 1);
      const newCities = cities.map((item, idx) => ({
        ...item,
        id: idx
      }));
      StorageService.setStorageCities(newCities);
      return newCities;
    })()
  })),

  on(ActionWeatherUpdateOneSuccess, (state, response) => ({
      ...state,
      cities: (() => {
        const id = response.id;
        const cities = [...state.cities];
        const index = cities.findIndex((item) => item.id === id);
        if (index === -1) {
          return cities;
        }
        cities[index] = {
          ...cities[index],
          weather: {
            temp: response.data.main.temp,
            clouds: response.data.clouds.all,
            wind_speed: response.data.wind.speed,
            weather: (() => {
              if (response.data.snow) {
                return 'snow';
              } else if (response.data.rain) {
                return 'rain';
              } else  {
                return null;
              }
            })()
          }
        };
        StorageService.setStorageCities(cities);
        return cities;
      })()
    })
  ),

  on(ActionWeatherUpdateError, (state, data) => {
    alert(data.error);
    return  {
    ...state,
        errors: data.error
    };
  }),

  on(ActionWeatherTimerStart, (state) => {
    alert('Timer start');
    return  {
      ...state,
      timer: true
    };
  }),

  on(ActionWeatherTimerStop, (state) => {
    alert('Timer stop');
    return  {
      ...state,
      timer: false
    };
  })
);

const featureSelector
  = createFeatureSelector<WeatherStateInterface>(WEATHER_KEY);

export const selectorWeatherGetCities = createSelector(
  featureSelector,
  state => state.cities
);

export const selectorWeatherGetError = createSelector(
  featureSelector,
  state => state.errors
);

export const selectorWeatherGetTimer = createSelector(
  featureSelector,
  state => state.timer
);
