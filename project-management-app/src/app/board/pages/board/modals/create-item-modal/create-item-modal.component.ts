import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-create-item-modal',
  templateUrl: './create-item-modal.component.html',
  styleUrls: ['./create-item-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateItemModalComponent {

  public input: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
