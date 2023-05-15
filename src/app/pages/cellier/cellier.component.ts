import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { NouveauCellierDialogComponent } from './components/nouveau-cellier-dialog/nouveau-cellier-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const HAUTEUR_RANGEE: { [id:number]: number} = {1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-cellier',
  templateUrl: './cellier.component.html'
})
export class CellierComponent implements OnInit, OnDestroy {
  cols = 3;
  hauteurRangee = HAUTEUR_RANGEE[this.cols];
  type: string | undefined;
  celliers: Array<Cellier> | undefined;
  tri = 'desc';
  nombreItems = '12';
  cellierSubscription: Subscription | undefined;

  constructor(private cellierService: CellierService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
      this.getCelliers();
  }

  getCelliers(): void {
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
    this.getCelliers();
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
    this.nombreItems = nouveauNombre.toString();
    this.getCelliers();
  }

  onTriChangement(nouveauTri: string):void {
    this.tri = nouveauTri;
    this.getCelliers();
  }

  openNouveauCellierDialog(){
    const dialogRef = this.dialog.open(NouveauCellierDialogComponent, {
      width: '450px',
      height: '600px'
    });
  }

  ngOnDestroy(): void {
      if(this.cellierSubscription) {
        this.cellierSubscription.unsubscribe();
      }
  }
}
