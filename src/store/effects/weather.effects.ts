import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {GetWeatherService} from '../../app/services/http/get-weather.service';
import {from, Observable, Subject, Subscription, timer} from 'rxjs';
import {
  ActionWeatherTimerStart, ActionWeatherTimerStop,
  ActionWeatherUpdateError,
  ActionWeatherUpdateOneSuccess,
  selectorWeatherGetCities
} from '../reducers/weather.reducer';
import {concatMap, map, tap} from 'rxjs/operators';
import {DataWeatherInterface} from '../../app/interfaces/dataWeatherInterface';

@Injectable()
export class WeatherEffects {

  private listener: Subscription | null = null;

  weatherUpdate$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[WEATHER] update'),
        concatLatestFrom(() => this.store$.select(selectorWeatherGetCities)),
        tap((body) => {
          const cities = body[1];
          if (!this.listener) {
            const stream$: Subject<string> = new Subject();
            this.store$.dispatch(ActionWeatherTimerStart());
            this.listener = stream$.subscribe(_ => {
              from(cities).pipe(
                concatMap((item) => {
                  return this.getWeatherService.get({city: item.city})
                    .pipe(map(
                      (data) => ({data, id: item.id})
                    ));
                })
              ).subscribe({
                next: (response) => {
                  this.store$.dispatch(ActionWeatherUpdateOneSuccess(response));
                },
                error: (error) => {
                  this.store$.dispatch(ActionWeatherUpdateError(error));
                },
                complete: () => {
                  timer(10000).subscribe(_ => {
                    stream$.next('new');
                  });
                }
              });
            });
            stream$.next('new');
          } else {
            alert('Timer is doing');
          }

        })
      ),
    { dispatch: false }
  );

  weatherUpdateObservable$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[WEATHER] update observable'),
        concatLatestFrom(() => this.store$.select(selectorWeatherGetCities)),
        tap((body) => {
          const cities = body[1];
          this.store$.dispatch(ActionWeatherTimerStart());
          if (!this.listener) {
            const observable = new Observable(subscriber => {
              this.listener = timer(0, 10000).subscribe(_ => {
                from(cities).pipe(
                  concatMap((item) => {
                    return this.getWeatherService.get({city: item.city})
                      .pipe(map(
                        (data) => ({data, id: item.id})
                      ));
                  })
                ).subscribe({
                  next: (response) => {
                    subscriber.next(response);
                  },
                  error: (error) => {
                    subscriber.next(error);
                  }
                });
              });
            });
            observable.subscribe({
              next: (response: {data: DataWeatherInterface, id: number}) => this.store$.dispatch(ActionWeatherUpdateOneSuccess(response)),
              error: (error) => this.store$.dispatch(ActionWeatherUpdateError(error))
            });
          } else {
            alert('Timer is doing');
          }
        })
      ),
    { dispatch: false }
  );

  weatherUpdateStop$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[WEATHER] update stop'),
        tap(() => {
          if (this.listener) {
            this.listener.unsubscribe();
            this.listener = null;
            this.store$.dispatch(ActionWeatherTimerStop());
          } else {
            alert(`Timer isn't doing`);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions,
              private store$: Store,
              private getWeatherService: GetWeatherService) {}
}
