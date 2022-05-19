import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelPlus } from 'src/app/core/models/tasks';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {
  transform(tasks: TaskModelPlus[], pipe: string): TaskModelPlus[] {
    return tasks.filter(e => e.title.includes(pipe));
  }
}
