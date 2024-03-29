import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})

export class TempPipe implements PipeTransform {
  transform(temp: number | undefined): number | null {
    if (typeof temp === 'number') {
      return Math.round(temp);
    }
    return null;
  }
}
