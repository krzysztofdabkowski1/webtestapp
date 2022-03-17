import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (!args) {return value;}
    return value.replace(args, "<mark>$&</mark>");
}

}
