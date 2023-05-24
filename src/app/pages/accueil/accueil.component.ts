import { Component, EventEmitter, OnDestroy, OnInit,Output } from '@angular/core';
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
  type: number | undefined;
  format: number | undefined;
  pays: number | undefined;
  bouteilles: Array<Bouteille> | undefined;
  bouteilleSubscription: Subscription | undefined;
  celliers: Array<Cellier> | undefined;
  tri = 'desc';
  nombre = '12';
  cellierSubscription: Subscription | undefined;
  isChargement = false;


  constructor(private catalogueService: CatalogueService, private cellierService: CellierService) {}

  ngOnInit(): void {
      this.getBouteilles();
  }

  getBouteilles(): void {
    this.bouteilleSubscription = this.catalogueService.getAllBouteilles(this.nombre, this.tri, this.type, this.format, this.pays)
      .subscribe((_bouteilles)=>{
        this.bouteilles = _bouteilles;
      })
  }

  getNouvelleBouteilles(): void{
    this.isChargement = true;
    this.catalogueService.getNouvelleBouteilles().subscribe(bouteilles =>{
      const aBouteille = bouteilles.nouvellesBouteilles;
      console.log(this.bouteilles)
      console.log(aBouteille)
      this.bouteilles!.push(...aBouteille);
      console.log(this.bouteilles)
      this.isChargement = false;
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

  onVoirType(nouveauType:number):void {
    if(this.type !== nouveauType) {
      this.type = nouveauType;
    } else {
      this.type = undefined;
    }
    this.getBouteilles();
  }

  onVoirFormat(nouveauFormat:number):void {
    if (this.format !== nouveauFormat) {
      this.format = nouveauFormat;
    } else {
      this.format = undefined;
    }
    this.getBouteilles();
  }

  onVoirPays(nouveauPays: number): void {
    if (this.pays !== nouveauPays) {
      this.pays = nouveauPays;
    } else {
      this.pays = undefined;
    }
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
      if(this.cellierSubscription) {
        this.cellierSubscription.unsubscribe();
      }
  }

  supprimerBouteille(id_bouteille:number){}

  modifierBouteille(bouteilleModifiee: Bouteille) {
    const index = this.bouteilles?.findIndex((bouteille) => bouteille.id === bouteilleModifiee.id);
    if (index !== undefined && index !== -1) {
      this.bouteilles![index] = bouteilleModifiee;
    }
  }
}
