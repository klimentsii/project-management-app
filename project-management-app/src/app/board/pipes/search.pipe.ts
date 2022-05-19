import { Pipe, PipeTransform } from '@angular/core';
import { BoardUsersModel } from 'src/app/core/models/boards';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(boards: BoardUsersModel[], pipe: string): BoardUsersModel[] {
    return boards.filter(e => e.title.includes(pipe));
  }
}
