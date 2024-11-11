import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    const isLong = value.length > 40 ? '...' : '';
    const truncate = value.slice(0, 40) + isLong;
    return truncate;
  }
}
