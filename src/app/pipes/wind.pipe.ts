import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wind'
})

export class WindPipe implements PipeTransform {
  transform(wind: number | undefined): number | null {
    if (typeof wind === 'number') {
      return Math.round(wind);
    }
    return null;
  }
}
