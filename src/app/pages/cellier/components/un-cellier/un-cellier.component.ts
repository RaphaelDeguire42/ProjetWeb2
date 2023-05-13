import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cellier } from 'src/app/models/models';

@Component({
  selector: 'app-un-cellier',
  templateUrl: './un-cellier.component.html'
})
export class UnCellierComponent {
  @Input() modePleinEcran = false;
  @Input() cellier: Cellier | undefined;
  @Output() ajouterAuPanier = new EventEmitter();

  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.cellier);
  }

}
