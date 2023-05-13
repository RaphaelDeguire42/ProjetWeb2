import { Component, OnInit } from '@angular/core';
import { Panier } from './models/models';
import { PanierService } from './services/panier.service';

@Component({
  selector: 'app-root',
  template: `
    <app-entete [panier]="panier"></app-entete>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  panier: Panier = { items: [] };

  constructor(private panierService: PanierService) {
  }

  ngOnInit(): void {
    this.panierService.panier.subscribe((_panier) => {
      this.panier = _panier;
    })
  }
}
