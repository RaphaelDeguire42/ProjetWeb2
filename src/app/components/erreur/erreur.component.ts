import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErreurDialogComponent } from '../erreur-dialog/erreur-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { CatalogueService } from 'src/app/services/catalogue.service';


@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})

export class ErreurComponent {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private catalogueService: CatalogueService, private userService: UserService) {}

  openErreurDialog(){
    const dialogRef = this.dialog.open(ErreurDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.catalogueService.ajouterNouvelleErreur(result).subscribe(response => {
        this.snackBar.open(`Merci d'avoir signalé une erreur`, 'Fermer', {
          duration: 3000
        });
      })
      }
    });
  }
}

