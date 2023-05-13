import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cellier } from 'src/app/models/models';

@Component({
  selector: 'app-un-cellier',
  templateUrl: './un-cellier.component.html'
})
export class UnCellierComponent {
  @Input() fullWidthMode = false;
  @Input() cellier: Cellier | undefined;
  @Output() addToCart = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.cellier);
  }

}
