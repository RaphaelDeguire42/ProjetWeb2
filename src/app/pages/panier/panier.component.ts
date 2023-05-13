import { Component, OnInit } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {
  panier: Panier = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 3,
    id: 2
  }]};
  dataSource: Array<PanierItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.dataSource = this.panier.items;
    this.panierService.panier.subscribe((_panier: Panier) => {
      this.panier = _panier;
      this.dataSource = this.panier.items;
    })
  }

  getTotal(items: Array<PanierItem>): number {
    return this.panierService.getTotal(items);
  }

  onClearPanier(): void {
    this.panierService.clearPanier();
  }

  onSupprimerDuPanier(item: PanierItem): void {
    this.panierService.supprimerDuPanier(item);
  }

  onAjouterQuantite(item: PanierItem): void {
    this.panierService.addToPanier(item);
  }

  onSupprimerQuantite(item: PanierItem): void {
    this.panierService.supprimerQuantite(item);
  }

}
