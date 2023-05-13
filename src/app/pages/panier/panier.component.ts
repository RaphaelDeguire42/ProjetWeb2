import { Component, OnInit } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {
  panier: Panier = { items: [{
    bouteille: 'https://via.placeholder.com/150',
    nom: 'snickers',
    prix: 150,
    quantite: 1,
    id: 1
  },
  {
    bouteille: 'https://via.placeholder.com/150',
    nom: 'snickers',
    prix: 150,
    quantite: 3,
    id: 2
  }]};
  sourceDonnees: Array<PanierItem> = [];
  colonneAffiche: Array<string> = [
    'bouteille',
    'nom',
    'prix',
    'quantite',
    'total',
    'action'
  ];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.sourceDonnees = this.panier.items;
    this.panierService.panier.subscribe((_panier: Panier) => {
      this.panier = _panier;
      this.sourceDonnees = this.panier.items;
    })
  }

  getTotal(items: Array<PanierItem>): number {
    return this.panierService.getTotal(items);
  }

  onViderPanier(): void {
    this.panierService.viderPanier();
  }

  onSupprimerDuPanier(item: PanierItem): void {
    this.panierService.supprimerDuPanier(item);
  }

  onAjouterQuantite(item: PanierItem): void {
    this.panierService.ajouterAuPanier(item);
  }

  onSupprimerQuantite(item: PanierItem): void {
    this.panierService.supprimerQuantite(item);
  }

}
