import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bouteille, Cellier } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { CellierService } from 'src/app/services/cellier.service';

const HAUTEUR_RANGEE: { [id:number]: number} = {1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit, OnDestroy {
  cols = 3;
  hauteurRangee = HAUTEUR_RANGEE[this.cols];
  type: string | undefined;
  bouteilles: Array<Bouteille> | undefined;
  celliers: Array<Cellier> | undefined;
  tri = 'desc';
  nombre = '12';
  bouteilleSubscription: Subscription | undefined;
  cellierSubscription: Subscription | undefined;


  constructor(private catalogueService: CatalogueService, private cellierService: CellierService) {}

  ngOnInit(): void {
      this.getBouteilles();
  }

  getBouteilles(): void {
    this.bouteilleSubscription = this.catalogueService.getAllBouteilles(this.nombre, this.tri, this.type)
      .subscribe((_bouteilles)=>{
        this.bouteilles = _bouteilles;
      })
  }

  getCelliersUtilisateur(): void {
    this.cellierSubscription = this.cellierService.getCelliersUtilisateur()
      .subscribe((_celliers)=>{
        this.celliers = _celliers;
      })
  }

  onColonneNombreChangement(colsNum: number): void {
    this.cols = colsNum;
    this.hauteurRangee = HAUTEUR_RANGEE[this.cols];
  }

  onVoirType(nouveauType:string):void {
    this.type = nouveauType;
    this.getBouteilles();
  }

  onAjouterAuPanier(product: any):void {
    /*
    this.cartService.ajouterAuPanier({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
    */
  }

  onItemsNombreChangement(nouveauNombre: number):void {
    this.nombre = nouveauNombre.toString();
    this.getBouteilles();
  }

  onTriChangement(nouveauTri: string):void {
    this.tri = nouveauTri;
    this.getBouteilles();
  }

  ngOnDestroy(): void {
      if(this.bouteilleSubscription) {
        this.bouteilleSubscription.unsubscribe();
      }
  }
}
