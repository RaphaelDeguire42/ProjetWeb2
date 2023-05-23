import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bouteille } from 'src/app/models/models';
import { AjouterBouteilleDialogComponent } from '../ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';
import { CellierService } from 'src/app/services/cellier.service';
import { ModifierBouteilleDialogComponent } from '../modifier-bouteille-dialog/modifier-bouteille-dialog.component';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html'
})
export class UneBouteilleComponent {
  @Input() modePleinEcran = false;
  @Input() bouteille: Bouteille | undefined;
  @Output() bouteilleSupprime: EventEmitter<number> = new EventEmitter<number>();
  @Output() bouteilleModifiee: EventEmitter<Bouteille> = new EventEmitter<Bouteille>();


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}

  @Output() ajouterAuPanier = new EventEmitter();

  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.bouteille);
    console.log(this.bouteille)
  }

  openAjouterBouteilleDialog(id_bouteille:number){
    const dialogRef = this.dialog.open(AjouterBouteilleDialogComponent, {
      width: '450px',
      height: '600px',
      data: { id_bouteille }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.cellierService.ajouterBouteilleCellier(result).subscribe(response => {
        this.snackBar.open('Votre bouteille a été ajouté au cellier.', 'Fermer', {
          duration: 3000
        });
      })
      }
    });
  }

  openModifierBouteilleDialog(id_bouteille:number){
    const dialogRef = this.dialog.open(ModifierBouteilleDialogComponent, {
      width: '350px',
      data: { id_bouteille, ...this.bouteille },
    });

    dialogRef.afterClosed().subscribe((bouteilleModifiee) => {
        this.bouteille = bouteilleModifiee;
        this.bouteilleModifiee.emit(bouteilleModifiee);
    });
  }

}
