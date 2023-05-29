import { Component, OnInit } from '@angular/core';
import { Panier } from './models/models';
import { PanierService } from './services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngIf="!isConnexionRoute()">
  <app-entete [panier]="panier"></app-entete>
</ng-container>
<router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  panier: Panier = { items: [] };

  constructor(private panierService: PanierService, private router: Router) {
  }

  ngOnInit(): void {
    this.panierService.panier.subscribe((_panier) => {
      this.panier = _panier;
    })
  }

  isConnexionRoute(): boolean {
    const url = this.router.url;
    return url === '/connexion' || url === '/creer-un-compte';
  }
}
