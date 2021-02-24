import { Component } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.scss']
})
export class Part3Component {
  stream(): void {
    const stream$ = new Observable(observer => {
      observer.next('First value');
      setTimeout(() => observer.next('After 1000'), 1000);
      setTimeout(() => observer.complete(), 1500);
      setTimeout(() => observer.next('wrong'), 2000);
      setTimeout(() => observer.next('After 3000'), 3000);
    });
    stream$.subscribe(
      val => console.log('Val', val),
      (err) => console.log(err),
      () => console.log('Complete')
    );
    // stream$.subscribe({
    //   next(val): void {
    //     console.log(val);
    //   },
    //   error(err): void {
    //     console.log(err);
    //   },
    //   complete(): void {
    //     console.log('Complete');
    //   }
    // });
  }
}
