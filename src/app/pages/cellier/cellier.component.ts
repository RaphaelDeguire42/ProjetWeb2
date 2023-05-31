import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { NouveauCellierDialogComponent } from './components/nouveau-cellier-dialog/nouveau-cellier-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

const HAUTEUR_RANGEE: { [id: number]: number } = { 1: 400, 3: 428, 4: 350 };

@Component({
  selector: 'app-cellier',
  templateUrl: './cellier.component.html',
  styleUrls: ['./cellier.component.scss']
})

export class CellierComponent implements OnInit, OnDestroy {
  cols = 3;
  hauteurRangee = HAUTEUR_RANGEE[this.cols];
  type: string | undefined;
  celliers: Array<Cellier> | undefined;
  tri = 'desc';
  nombreItems = '12';
  cellierSubscription: Subscription | undefined;

  constructor(private cellierService: CellierService, private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
      this.getCelliers();
  }

  getCelliers(): void {
    const id_user = this.userService.getUtilisateur().id;
    this.cellierSubscription = this.cellierService.getCelliersUtilisateur(id_user).subscribe((_celliers)=>{
      this.celliers = _celliers.data
    })
  }

  onVoirType(nouveauType:string):void {
    this.type = nouveauType;
    this.getCelliers();
  }

  openNouveauCellierDialog(): void {
    const dialogRef = this.dialog.open(NouveauCellierDialogComponent, { width: '450px', height: '600px' });
    dialogRef.afterClosed().subscribe((cellier: Cellier | undefined) => {
      if (cellier) {
        cellier.id_user = this.userService.getUtilisateur().id;
        this.cellierService.nouveauCellier(cellier).subscribe((id_cellier)=>{
          cellier.id = id_cellier.id;
          this.celliers!.push(cellier);
          this.snackBar.open(`Le cellier a été ajouté.`, 'Fermer', {duration: 3000});
        })
      }
    });
  }


  supprimerCellier(id_cellier: number): void {
    console.log(id_cellier)
    this.cellierService.supprimerCellier(id_cellier).subscribe(() => {
      this.celliers = this.celliers?.filter(cellier => cellier.id !== id_cellier);
      this.snackBar.open(`Le cellier a été supprimé.`, 'Fermer', {duration: 3000});
    });
  }

  ngOnDestroy(): void {
      if(this.cellierSubscription) {
        this.cellierSubscription.unsubscribe();
      }
  }
}
