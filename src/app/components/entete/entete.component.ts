import { Component, Input } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
})
export class EnteteComponent {
  private _panier: Panier = { items: [] };
  itemsQuantity = 0;

  @Input()
  get panier(): Panier {
    return this._panier;
  }

  set panier(panier: Panier) {
    this._panier = panier;

    this.itemsQuantity = panier.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private panierService: PanierService) {

  }

  getTotal(items: Array<PanierItem>): number {
    return this.panierService.getTotal(items);
  }

  onClearPanier(): void {
    this.panierService.clearPanier();
  }
}
