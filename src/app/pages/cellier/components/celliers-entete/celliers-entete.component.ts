import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-celliers-entete',
  templateUrl: './celliers-entete.component.html'
})
export class CelliersEnteteComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdated(newSort: string):void {
    this.sort = newSort;
    this.sortChange.emit(newSort)
  }

  onItemsUpdated(count:number):void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colsNum:number):void {
    this.columnsCountChange.emit(colsNum);
  }
}
