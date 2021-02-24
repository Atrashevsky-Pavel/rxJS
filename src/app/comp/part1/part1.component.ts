import { Component } from '@angular/core';
import {interval} from 'rxjs';
import {filter, map, take, scan} from 'rxjs/operators';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component  {
  disableRxJS = false;
  result1 = '';
  result2;
  people = [
    {name: 'Petya', age: 25},
    {name: 'Syna', age: 81},
    {name: 'Perdun', age: 12},
    {name: 'Pizdun', age: 33},
    {name: 'Lox', age: 24},
    {name: 'Chuhan', age: 11},
  ];
  alcohol(): void {
    let i = 0;
    const canDrink = [];
    const interval = setInterval(() => {
       if (this.people[i]) {
        if (this.people[i].age >= 18) {
          canDrink.push(this.people[i].name);
        }
        this.result1 = canDrink.join(' ');
        i++;
      }else  {
        clearInterval(interval);
      }
    }, 1000);
  }
  alcoholRxJS(): void {
    this.disableRxJS = true;
    interval(1000)
      .pipe(
        take(this.people.length),
        filter(i => this.people[i].age >= 18),
        map(i => this.people[i].name),
        scan((acc, v) => acc.concat(v), [])
      ).subscribe( res => {
      this.result2 = res.join();
    }, null, () => this.disableRxJS = false);
  }
}
