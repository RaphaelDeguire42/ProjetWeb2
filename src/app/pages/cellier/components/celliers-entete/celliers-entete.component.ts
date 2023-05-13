import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-celliers-entete',
  templateUrl: './celliers-entete.component.html'
})
export class CelliersEnteteComponent {
  @Output() colonneNombreChangement = new EventEmitter<number>();
  @Output() itemsNombreChangement = new EventEmitter<number>();
  @Output() triChangement = new EventEmitter<string>();

  tri = 'desc';
  voirNombreItems = 12;

  onModTri(nouveauTri: string):void {
    this.tri = nouveauTri;
    this.triChangement.emit(nouveauTri)
  }

  onModItems(count:number):void {
    this.voirNombreItems = count;
    this.itemsNombreChangement.emit(count);
  }

  onModColonne(colsNum:number):void {
    this.colonneNombreChangement.emit(colsNum);
  }
}
