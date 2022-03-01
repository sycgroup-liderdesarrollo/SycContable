import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipefilter'
})
export class PipefilterPipe implements PipeTransform {

  transform(user: any[], filteruser: string): any {
   return user ? user.filter(user => user.name.search(new RegExp(filteruser,'i')) > -1): [];
  }

}
