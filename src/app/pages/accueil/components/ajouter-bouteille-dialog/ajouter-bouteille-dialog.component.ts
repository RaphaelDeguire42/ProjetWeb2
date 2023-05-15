import { Component, Input, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';

@Component({
  selector: 'app-ajouter-bouteille-dialog',
  templateUrl: './ajouter-bouteille-dialog.component.html',
  styleUrls: ['./ajouter-bouteille-dialog.component.scss']
})
export class AjouterBouteilleDialogComponent {
  id_bouteille:number|string = '';
  celliers: Array<Cellier> | undefined;
  celliersSubscription: Subscription | undefined;

  formAjout: FormGroup = new FormGroup({
    id_cellier: new FormControl('', [Validators.required]),
    id_bouteille: new FormControl(''),
  });


  constructor(private fb: FormBuilder, private http:HttpClient, public dialogRef: MatDialogRef<AjouterBouteilleDialogComponent>,private snackBar:MatSnackBar, private cellierService: CellierService, @Inject(MAT_DIALOG_DATA) public data: { id_bouteille: number }
  ) {}

  ngOnInit(): void {
    this.id_bouteille = this.data.id_bouteille;

    this.celliersSubscription = this.cellierService.getCelliersUtilisateur()
    .subscribe((response) => {
      this.celliers = response;
    });
    /*
    this.http.get<Cellier[]>('/api/celliers/'+this.id_bouteille).subscribe((celliers) => {
      this.celliers = celliers;
    });
    */


    this.formAjout = this.fb.group({
      id_cellier: [this.celliers![0].id, [Validators.required]],
      id_bouteille: [this.id_bouteille]
    });
  }

  ajouterBouteilleCellier() {
    if (this.formAjout.valid) {
      let formData = this.formAjout.value;
      console.log(formData);
      this.cellierService.ajouterBouteilleCellier(formData).subscribe(response => {
        this.snackBar.open('Votre cellier a été crée.', 'Fermer', {
          duration: 3000
        });
        this.dialogRef.close();
      },
        error => {
        console.error(error);
      })

    }
  }

  getCelliers() {

    return this.celliers;
  }

  annuler(): void {
    this.dialogRef.close();
  }

}
