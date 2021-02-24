import { Component } from '@angular/core';
import {interval, range, timer} from 'rxjs';
import {filter, map} from 'rxjs/operators';
@Component({
  selector: 'app-part4',
  templateUrl: './part4.component.html',
  styleUrls: ['./part4.component.scss']
})
export class Part4Component  {
  stream1(): void {
  const sub = interval(500)
     .subscribe(value => console.log(value));
  setTimeout(() => {
    sub.unsubscribe();
  }, 4000);
  }
  stream2(): void {
    timer(1500)
      .subscribe(v => console.log(v));
  }
  stream3(): void {
   range(42, 10)
     .subscribe(v => console.log(v));
  }
  stream4(): void {
    range(42, 10).pipe(
      filter(i => i % 2 === 0),
      map(i => i)
    ).subscribe((v) => console.log(v));
  }
}
