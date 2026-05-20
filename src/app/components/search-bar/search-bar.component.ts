import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component,  model, output } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule,FormsModule, MaterialModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {

  /* @Input() search: string = 'Initial';
  search = input<string>('Initial'); */
  search = model<string>('Initial');

  /* @Output() searchChange = new EventEmitter<string>()
  searchChange = output<string>()

  @Output('submit') SearchButtonClicked = new EventEmitter(); */
  SearchButtonClicked = output({
    alias: 'submit',
  });
  searchClick() {
    this.SearchButtonClicked.emit();
  }

 /*  updateSearch(value:string):void {
    // this.searchChange.emit(value);
    this.search.set(value);
  } */
}
