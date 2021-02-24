import { Component, OnInit } from '@angular/core';
import {Subject, BehaviorSubject, ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-part5',
  templateUrl: './part5.component.html',
  styleUrls: ['./part5.component.scss']
})
export class Part5Component  {
  stream1(): void {
    const stream$ = new Subject();

    stream$.subscribe(v => console.log(v));
    stream$.next('Hello1');
    stream$.next('Hello2');
    stream$.next('Hello3');
  }
  stream2(): void {
    const stream1$ = new BehaviorSubject('First!');
    stream1$.subscribe(v => console.log(v));
    stream1$.next('Hello1');
    stream1$.next('Hello2');
    stream1$.next('Hello3');
    console.log('_______________');
    const stream2$ = new BehaviorSubject('First!');
    stream2$.next('Hello');
    stream2$.subscribe(v => console.log(v));
  }
  stream3(): void {
    const stream3$ = new ReplaySubject(2);
      stream3$.next('Hello1');
      stream3$.next('Hello2');
      stream3$.next('Hello3');
      stream3$.subscribe(v => console.log(v));
  }
}
