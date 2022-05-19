import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelPlus } from 'src/app/core/models/tasks';

@Pipe({
  name: 'filteredTasks'
})
export class FilteredTasksPipe implements PipeTransform {
  transform(value: TaskModelPlus[], columnId: UUIDType): TaskModelPlus[] {
    return [...value].filter(e => e.columnId === columnId);
  }
}
