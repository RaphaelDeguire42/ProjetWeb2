import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';

@Component({
  selector: 'app-un-cellier',
  templateUrl: './un-cellier.component.html'
})
export class UnCellierComponent {
  @Input() modePleinEcran = false;
  @Input() cellier: Cellier | undefined;
  @Output() cellierSupprime: EventEmitter<number> = new EventEmitter<number>();


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}

  onSupprimerCellier(id_cellier:number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer ce cellier?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.supprimerCellier(id_cellier);

      }
    });
  }

  supprimerCellier(id_cellier: number): void {
    this.cellierService.supprimerCellier(id_cellier).subscribe((id_cellier) => {
      this.cellierSupprime.emit(id_cellier);
      this.snackBar.open(`Le cellier a été supprimé.`, 'Fermer', {
        duration: 5000,
      });
    });
  }

}
