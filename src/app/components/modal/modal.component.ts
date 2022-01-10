import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {GetCitiesAutocompleteService} from '../../services/http/get-cities-autocomplete.service';
import {ActionWeatherAddCity, selectorWeatherGetCities} from '../../../store/reducers/weather.reducer';
import {fromEvent} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild('cityInput') cityInputRef!: ElementRef;
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  cities: Array<string> = [];
  citiesOption: Array<{city: string, active: boolean}> = [];
  saveDisabled = true;
  showAutocomplete = false;
  constructor(private store: Store, private getCitiesAutocompleteService: GetCitiesAutocompleteService) {
    this.store.select(selectorWeatherGetCities).subscribe((cities) => {
      // @ts-ignore
      this.cities = cities.map((item) => item.city);
    });
  }

  ngOnInit(): void {
    document.onkeydown = (event) => {
      const code = event.code;
      if (code === 'Tab' || code === 'Escape') {
        this.closeModal();
      }
      if (this.citiesOption.length) {
        const index = this.citiesOption.findIndex((item) => item.active);
        const indexUp = () => {
          if ((index + 1) === this.citiesOption.length) {
            this.citiesOption[index].active = false;
            this.citiesOption[0].active = true;
            return;
          }
          this.citiesOption[index].active = false;
          this.citiesOption[index + 1].active = true;
        };
        const indexDown = () => {
          if (index === 0) {
            this.citiesOption[index].active = false;
            this.citiesOption[this.citiesOption.length - 1].active = true;
            return;
          }
          this.citiesOption[index].active = false;
          this.citiesOption[index - 1].active = true;
        };
        switch (code) {
          case 'ArrowDown':
            indexUp();
            break;
          case 'ArrowUp':
            indexDown();
            break;
          case 'Enter':
           this.chooseCityOption(this.citiesOption[index].city);
           break;
          default:
            break;
        }
      }
    };
  }

  ngAfterViewInit(): void {
    const stream$ = fromEvent(this.cityInputRef.nativeElement, ('input'));
    stream$.pipe(
      // @ts-ignore
      map((el: KeyboardEvent) => el.target.value),
      filter((value) => {
        this.showAutocomplete = false;
        if (value.length > 2) {
          return true;
        }
        this.citiesOption = [];
        return false;
      }),
      mergeMap((input) => {
        return this.getCitiesAutocompleteService.get(input)
          .pipe(map((data) => ({cities: data, input})));
      }),
      map((data) => {
        const input = data.input.toLowerCase();
        if (data.cities.length !== 0) {
          const cities = data.cities.filter((item ) => {
            const cityOption = item.name.toLowerCase();
            return cityOption.startsWith(input) && !this.cities.find((current) => current.toLowerCase() === cityOption);
          });
          const result = cities
            .find((current) => current.name.toLowerCase() === input.toLowerCase());
          (result) ? this.saveDisabled = false : this.saveDisabled = true;
          if (cities.length !== 0) {
            this.showAutocomplete = true;
            return cities;
          } else {
            return [];
          }
        } else {
          this.showAutocomplete = false;
          return [];
        }
      })
    ).subscribe((citiesOption) => {
      this.citiesOption = citiesOption.map((item, idx) => (
          {city: item.name, active: (idx === 0) ? true : false}
        ));
    },
      (error) => (alert(`${error},  restart modal window`))
    );
  }

  chooseCityOption(city: string): void {
    this.showAutocomplete = false;
    this.citiesOption = [];
    this.cityInputRef.nativeElement.value = city;
  }

  closeModal(): void {
    document.onkeydown = null;
    this.showModal.emit(false);
  }

  switchModal(event: MouseEvent): void {
    const id = (event.target as HTMLInputElement).id;
    if (id === 'modal') {
      this.showModal.emit(false);
    }
  }

  saveCity(): void {
    const city = this.cityInputRef.nativeElement.value;
    this.store.dispatch(ActionWeatherAddCity({city}));
  }

}
