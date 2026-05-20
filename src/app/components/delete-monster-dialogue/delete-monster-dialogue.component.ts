import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-monster-dialogue',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Delete Monster</h2>
    <mat-dialog-content>
      <p>Do you want to delete the selected monster ?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button color="accent" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
  styles: `
  `,
})
export class DeleteMonsterDialogueComponent {}
