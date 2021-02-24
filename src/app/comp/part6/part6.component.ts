import { Component } from '@angular/core';
import {interval} from 'rxjs';
import {map, filter, tap, take, takeLast} from 'rxjs/operators';

@Component({
  selector: 'app-part6',
  templateUrl: './part6.component.html',
  styleUrls: ['./part6.component.scss']
})
export class Part6Component {
  stream1(): void {
    const stream$ = interval(1000)
      .pipe(
        tap(v => console.log('Tap:', v * 3)),
        map((v) => v * 3),
        filter(v => v % 2 === 0),
        take(5),
        takeLast(1)
    );

    stream$.subscribe({
      next: v => console.log('Next', v),
      complete: () => console.log('Complete')
    });
  }
}
