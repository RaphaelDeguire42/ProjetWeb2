import { Component, EventEmitter, Input, Output, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Cellier, CellierBouteille } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { Subscription } from 'rxjs';
import { AjouterBouteilleDialogComponent } from 'src/app/pages/accueil/components/ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';
import { ModifierBouteilleCellierDialogComponent } from '../modifier-bouteille-cellier-dialog/modifier-bouteille-cellier-dialog.component';


@Component({
  selector: 'app-un-cellier',
  templateUrl: './un-cellier.component.html',
  styleUrls: ['./un-cellier.component.scss']
})
export class UnCellierComponent {
  @Input() cellier: Cellier | undefined;
  @Input() numberOfCelliers: number | undefined;
  @Output() cellierSupprime: EventEmitter<number> = new EventEmitter<number>();
  cellierBouteilles: Array<CellierBouteille> | undefined;
  bouteillesSubscription: Subscription | undefined;
  cellierId: number | undefined;

  columnsToDisplay = ['quantite', 'nom', 'millesime', 'garde', 'prix', 'pays', 'type', 'format', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService){}

  ngOnInit(): void {
    if (this.cellier) {
      this.cellierId = this.cellier.id;
      this.cellierBouteilles = this.cellier.bouteillesDuCellier
    }
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer cette bouteille du cellier?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.cellierService.supprimerBouteilleCellier(id_bouteille_cellier).subscribe(() => {
          this.cellierBouteilles = this.cellierBouteilles?.filter(cellierBouteille => cellierBouteille.id !== id_bouteille_cellier);
          this.snackBar.open(`La bouteille a été supprimée du cellier.`, 'Fermer', {
            duration: 5000,
          });
        });
      }
    });
  }

  modifierBouteille(bouteille: CellierBouteille): void {
    const dialogRef = this.dialog.open(ModifierBouteilleCellierDialogComponent, {
      width: '350px',
      data: { ...bouteille},
    });

    dialogRef.afterClosed().subscribe((bouteilleModifiee) => {
      if(bouteilleModifiee){
        const modifiedBouteille: any = {...bouteille,...bouteilleModifiee};

        const index = this.cellierBouteilles?.findIndex((b) => b.id === modifiedBouteille.id);

        if (index !== undefined && index !== -1) {
          this.cellierBouteilles![index] = modifiedBouteille;
          this.cellierBouteilles = this.cellierBouteilles!.slice();
        }

        this.snackBar.open('Votre bouteille a été modifiée.', 'Fermer', {
          duration: 3000
        });
        this.cellierService.modifierBouteilleCellier(bouteilleModifiee).subscribe(response => {})
      }
    });
  }

  ajouterBouteilleNonListee(){
    const dialogRef = this.dialog.open(AjouterBouteilleDialogComponent, {
      width: '450px',
      height: '600px',
      data: { id_cellier: this.cellier!.id }
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

  onSupprimerQuantite(bouteille:any){
    bouteille.quantite -= 1;
    if(bouteille.quantite === 0){
      this.cellierService.supprimerBouteilleCellier(bouteille.id).subscribe((response)=>{
        this.cellierBouteilles = this.cellierBouteilles?.filter(cellierBouteille => cellierBouteille.id !== bouteille.id);
        this.snackBar.open('Votre bouteille a été supprimée du cellier.', 'Fermer', {
          duration: 3000
        });
      });
    } else {
    this.cellierService.soustraireQteBouteille(bouteille);
  }
  }

  onAjouterQuantite(bouteille:any){
    this.cellierService.ajouterQteBouteille(bouteille);
  }
}

