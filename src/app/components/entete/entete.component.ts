import { Component, Input } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
})
export class EnteteComponent {
  private _panier: Panier = { items: [] };
  itemsQuantite = 0;

  @Input()
  get panier(): Panier {
    return this._panier;
  }

  set panier(panier: Panier) {
    this._panier = panier;

    this.itemsQuantite = panier.items
      .map((item) => item.quantite)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private panierService: PanierService) {}

  getTotal(items: Array<PanierItem>): number {
    return this.panierService.getTotal(items);
  }

  onViderPanier(): void {
    this.panierService.viderPanier();
  }
}
