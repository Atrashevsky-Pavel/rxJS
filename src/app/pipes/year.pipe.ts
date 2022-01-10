import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year'
})

export class YearPipe implements PipeTransform {

  transform(yearOfDevelopment: number): string {
    const thisYear = new Date().getFullYear();
    if (thisYear === yearOfDevelopment) {
        return String(yearOfDevelopment);
      } else if (thisYear > yearOfDevelopment) {
        return `${yearOfDevelopment} - ${thisYear}`;
      } else {
        return 'wrong year';
      }
  }
}
