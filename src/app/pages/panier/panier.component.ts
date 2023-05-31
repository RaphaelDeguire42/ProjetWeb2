import { Component, OnInit } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  panier: any = { items: [{}]};
  sourceDonnees: Array<PanierItem> = [];
  colonneAffiche: Array<string> = ['nom','prix','quantite','total','action'];

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
