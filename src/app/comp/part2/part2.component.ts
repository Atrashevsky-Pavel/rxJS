import { Component } from '@angular/core';
import {of, from} from 'rxjs';
import {scan} from 'rxjs/operators';
@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss']
})
export class Part2Component  {


  stream1(): void {
    const stream$ = of(1, 2, 3, 4).subscribe(value => {
      console.log(value);
    });
  }
  stream2(): void {
    const arr$ = from([1, 2, 3, 4]).pipe(
      scan((acc, v) => acc.concat(v), [])
    );
    arr$.subscribe(val => console.log(val));
  }

}
