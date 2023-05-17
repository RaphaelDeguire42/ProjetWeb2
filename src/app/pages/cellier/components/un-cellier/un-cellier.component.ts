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


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}


  ngOnInit(): void {
    this.getBouteillesCellier();
  }

  getBouteillesCellier(): void {
    this.bouteillesSubscription = this.cellierService.getBouteillesCellier(this.cellier!.id)
      .subscribe((_bouteilles)=>{
        this.cellierBouteilles = _bouteilles;
      })
  }

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


  toggleCellierDetails(): void {
    this.showCellierDetails = !this.showCellierDetails;
    if (this.showCellierDetails) {
      this.getBouteillesCellier(); // Retrieve cellier-bouteille details when toggled
    }
  }

}
