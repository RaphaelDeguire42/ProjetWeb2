import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bouteille } from 'src/app/models/models';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html'
})
export class UneBouteilleComponent {
  @Input() modePleinEcran = false;
  @Input() bouteille: Bouteille | undefined;

  @Output() ajouterAuPanier = new EventEmitter();
  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.bouteille);
  }

}
