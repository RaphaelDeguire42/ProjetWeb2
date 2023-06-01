import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { Panier, PanierItem } from 'src/app/models/models';
import { PanierService } from 'src/app/services/panier.service';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: [
    './entete.component.scss'
  ]
})
export class EnteteComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  role :boolean = false;
  private _panier: Panier = { items: [] };
  itemsQuantite = 0;
  navigationOuverte = false;
  animationDuration = '0.3s';
  animationTimingFunction = 'ease-in-out';

  @HostListener('window:resize')
  onWindowResize() {};

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

  constructor(private panierService: PanierService, private userService: UserService) {}

  ngOnInit(){
    this.role = this.userService.getRole();
  }

  getTotal(items: Array<PanierItem>): number {
    return this.panierService.getTotal(items);
  }

  onViderPanier(): void {
    this.panierService.viderPanier();
  }

  deconnexion(){
    this.userService.deconnexion();
  }

  ouvrirNavigation(): void {
    this.navigationOuverte = !this.navigationOuverte;
  }

  fermerNavigation(): void {
    this.navigationOuverte = false;
  }

  isMinWidth1000px(): boolean {
    return window.innerWidth >= 1000;
  }
}
