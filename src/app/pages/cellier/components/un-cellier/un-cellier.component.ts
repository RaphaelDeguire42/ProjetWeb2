import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Cellier, CellierBouteille } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { Subscription } from 'rxjs';

const HAUTEUR_RANGEE: { [id:number]: number} = {1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-un-cellier',
  templateUrl: './un-cellier.component.html',
  styleUrls: ['./un-cellier.component.scss']
})
export class UnCellierComponent {
  cols = 3;
  hauteurRangee = HAUTEUR_RANGEE[this.cols];
  @Input() modePleinEcran = false;
  @Input() cellier: Cellier | undefined;
  @Output() cellierSupprime: EventEmitter<number> = new EventEmitter<number>();
  cellierBouteilles: Array<CellierBouteille> | undefined;
  bouteillesSubscription: Subscription | undefined;
  showCellierDetails = false;
  cellierId: number | undefined; // Add cellierId property

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}

  ngOnInit(): void {
    if (this.cellier) {
      this.cellierId = this.cellier.id;

    }
  }

  getBouteillesCellier(id_cellier:number): void {
      this.bouteillesSubscription = this.cellierService.getBouteillesCellier(id_cellier)
        .subscribe((_bouteilles)=>{
          this.cellierBouteilles = _bouteilles;
        });
  }

  supprimerCellier(id_cellier: number): void {
    console.log(id_cellier)
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer ce cellier?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.cellierSupprime.emit(id_cellier);
      }
    });
  }

  supprimerBouteille(id_bouteille_cellier: number): void {
    console.log(id_bouteille_cellier);
    this.cellierService.supprimerBouteilleCellier(id_bouteille_cellier).subscribe(() => {
      this.cellierBouteilles = this.cellierBouteilles?.filter(cellierBouteille => cellierBouteille.id !== id_bouteille_cellier);
      this.snackBar.open(`La bouteille a été supprimée du cellier.`, 'Fermer', {
        duration: 5000,
      });
    });
  }

  modifierBouteille(bouteilleModifiee: CellierBouteille): void {
    console.log(bouteilleModifiee);
    const index = this.cellierBouteilles?.findIndex((bouteille) => bouteille.id === bouteilleModifiee.id);
    if (index !== undefined && index !== -1) {
      this.cellierBouteilles![index] = bouteilleModifiee;
    }
  }

  toggleCellierDetails(id_cellier:number): void {
    this.showCellierDetails = !this.showCellierDetails;
    if (this.showCellierDetails) {
      this.getBouteillesCellier(id_cellier);
    }
  }
}

