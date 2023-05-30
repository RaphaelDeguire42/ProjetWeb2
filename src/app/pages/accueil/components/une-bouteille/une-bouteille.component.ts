import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bouteille } from 'src/app/models/models';
import { AjouterBouteilleDialogComponent } from '../ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';
import { CellierService } from 'src/app/services/cellier.service';
import { ModifierBouteilleDialogComponent } from '../modifier-bouteille-dialog/modifier-bouteille-dialog.component';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html',
  styleUrls: ['./une-bouteille.component.scss']
})
export class UneBouteilleComponent {
  @Input() modePleinEcran = false;
  @Input() bouteille: Bouteille | undefined;
  @Output() bouteilleSupprime: EventEmitter<number> = new EventEmitter<number>();
  @Output() bouteilleModifiee: EventEmitter<Bouteille> = new EventEmitter<Bouteille>();
  @Output() ajouterAuPanier = new EventEmitter();


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService, private panierService: PanierService, private catalogueService: CatalogueService,private router: Router){}


  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.bouteille);
    const item = {
      id: this.bouteille!.id,
      nom: this.bouteille!.nom,
      prix: this.bouteille!.prix,
      quantite: 1
    }
    this.panierService.ajouterAuPanier(item)

  }

  openAjouterBouteilleDialog(id_bouteille:number){
    console.log(this.bouteille)
    const dialogRef = this.dialog.open(AjouterBouteilleDialogComponent, {
      width: '450px',
      height: '600px',
      data: { id_bouteille }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        result.type = this.bouteille!.type
        result.format = this.bouteille!.format
        result.pays = this.bouteille!.pays
        this.cellierService.ajouterBouteilleCellier(result).subscribe(response => {
          this.snackBar.open('Votre bouteille a été ajouté au cellier.', 'Fermer', {duration: 3000});
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
      if(bouteilleModifiee){
        this.catalogueService.modifierBouteille(bouteilleModifiee).subscribe(response => {
          if(response){
            this.snackBar.open('Votre bouteille a été modifiée.', 'Fermer', {duration: 3000});
            this.bouteille = bouteilleModifiee;
            this.bouteilleModifiee.emit(bouteilleModifiee);
          }
        })
      }
    });
  }

  navigateToBouteille(bouteilleId: number) {
    this.router.navigate(['/bouteille', bouteilleId]);
  }

  supprimerBouteille(id_bouteille_cellier: number): void {
    console.log(id_bouteille_cellier);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer cette bouteille?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.catalogueService.supprimerBouteille(id_bouteille_cellier).subscribe(() => {
          this.snackBar.open(`La bouteille a été supprimée.`, 'Fermer', {duration: 3000});
        });
      }
    });
  }
}
