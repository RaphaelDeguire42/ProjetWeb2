import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bouteille } from 'src/app/models/models';
import { AjouterBouteilleDialogComponent } from '../ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html'
})
export class UneBouteilleComponent {
  @Input() modePleinEcran = false;
  @Input() bouteille: Bouteille | undefined;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar){}

  @Output() ajouterAuPanier = new EventEmitter();
  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.bouteille);
  }

  openAjouterBouteilleDialog(id_bouteille:number){
    const dialogRef = this.dialog.open(AjouterBouteilleDialogComponent, {
      width: '450px',
      height: '600px',
      data: { id_bouteille }
    });
  }

}
