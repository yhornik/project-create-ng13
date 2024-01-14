import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentialFormat'
})
export class ExponentialFormatPipe implements PipeTransform {

  transform(value: number): string {
    return value.toExponential();
  }

}
