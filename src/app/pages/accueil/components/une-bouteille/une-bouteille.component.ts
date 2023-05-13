import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bouteille } from 'src/app/models/models';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html'
})
export class UneBouteilleComponent {
  @Input() fullWidthMode = false;
  @Input() bouteille: Bouteille | undefined;

  @Output() addToCart = new EventEmitter();
  onAddToCart(): void {
    this.addToCart.emit(this.bouteille);
  }

}
