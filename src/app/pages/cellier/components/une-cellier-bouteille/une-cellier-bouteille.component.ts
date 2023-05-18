import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Bouteille, CellierBouteille } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CellierService } from 'src/app/services/cellier.service';
import { ModifierBouteilleCellierDialogComponent } from '../modifier-bouteille-cellier-dialog/modifier-bouteille-cellier-dialog.component';

@Component({
  selector: 'app-une-cellier-bouteille',
  templateUrl: './une-cellier-bouteille.component.html',
  styleUrls: ['./une-cellier-bouteille.component.scss']
})
export class UneCellierBouteilleComponent {
  @Input() bouteille: Bouteille | undefined;
  @Input() modePleinEcran = false;
  @Output() bouteilleSupprime: EventEmitter<number> = new EventEmitter<number>();
  @Output() bouteilleModifiee: EventEmitter<CellierBouteille> = new EventEmitter<CellierBouteille>();



  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}

  supprimerBouteille(id_bouteille:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer cette bouteille du cellier?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.bouteilleSupprime.emit(id_bouteille);
      }
    });
  }

  modifierBouteille(id_bouteille: number) {
    const dialogRef = this.dialog.open(ModifierBouteilleCellierDialogComponent, {
      width: '350px',
      data: { id_bouteille, ...this.bouteille },
    });

    dialogRef.afterClosed().subscribe((bouteilleModifiee) => {
        const url_img = this.bouteille!.url_img;
        this.bouteille = bouteilleModifiee;
        bouteilleModifiee.url_img = url_img;
        this.bouteilleModifiee.emit(bouteilleModifiee);
    });
  }
}
