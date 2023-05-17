import { Component, Input } from '@angular/core';
import { Bouteille } from 'src/app/models/models';

@Component({
  selector: 'app-une-cellier-bouteille',
  templateUrl: './une-cellier-bouteille.component.html',
  styles: [
  ]
})
export class UneCellierBouteilleComponent {
  @Input() bouteille: Bouteille | undefined;
  @Input() modePleinEcran = false;

}
