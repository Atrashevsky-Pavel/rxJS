import { Injectable } from '@angular/core';
import {CityInterface} from '../../interfaces/weatherStateInterface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static keyCity = 'cities_key';

  static setStorageCities(data: Array<CityInterface>): void {
    localStorage.setItem(this.keyCity, JSON.stringify(data));
  }
  static getStorageCities(): Array<CityInterface> | [] {
    const storageString: string | null = localStorage.getItem(this.keyCity);
    if (localStorage.getItem(this.keyCity) && typeof storageString === 'string') {
        return JSON.parse(storageString);
    }
    return [];
  }
  static clearStorageCities(): void {
    localStorage.removeItem(this.keyCity);
  }

  constructor() { }
}
