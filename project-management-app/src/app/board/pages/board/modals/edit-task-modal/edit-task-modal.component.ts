
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModelPlus } from 'src/app/core/models/tasks';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskModalComponent {

  public task = {
    title: '',
    description: '',
    done: false,
  };

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModelPlus,
  ) {
    this.task.description = data.description;
    this.task.title = data.title;
    if (data.done) {
      this.task.done = true;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
