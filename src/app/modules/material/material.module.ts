import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
const material = [
  MatCardModule,
  MatButtonModule,
  MatCardImage,

  MatFormFieldModule, MatInputModule, MatSelectModule,
];
@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
