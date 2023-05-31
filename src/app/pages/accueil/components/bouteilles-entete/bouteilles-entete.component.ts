import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bouteilles-entete',
  templateUrl: './bouteilles-entete.component.html',
  styleUrls: ['./bouteilles-entete.component.scss']
})

export class BouteillesEnteteComponent {
  @Output() triChangement = new EventEmitter<string>();
  tri = 'desc';

  onModTri(nouveauTri: string):void {
    this.tri = nouveauTri;
    this.triChangement.emit(nouveauTri)
  }
}
