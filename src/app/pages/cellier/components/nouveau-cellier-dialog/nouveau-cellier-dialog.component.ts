import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Couleur } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nouveau-cellier-dialog',
  templateUrl: './nouveau-cellier-dialog.component.html',
  styleUrls: ['./nouveau-cellier-dialog.component.scss']
})
export class NouveauCellierDialogComponent {
  formAjout: FormGroup = new FormGroup({});
  couleurs:Array<Couleur> = [];
  couleursSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private http:HttpClient, public dialogRef: MatDialogRef<NouveauCellierDialogComponent>,private snackBar:MatSnackBar, private cellierService:CellierService) {
    this.formAjout = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      id_couleur: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.couleursSubscription = this.cellierService.getCouleurs().subscribe((data) => {
      console.log(data)
      this.couleurs = data;
      if (this.couleurs.length > 0 && this.couleurs[0] != null) {
        this.formAjout.controls['id_couleur'].setValue(this.couleurs[0].id || 1);
      }
    });

  }

  ajouterCellier() {
    console.log(this.formAjout.errors)
    if (this.formAjout.valid) {
      const formData = this.formAjout.value;
      formData.id_couleur = parseInt(formData.id_couleur, 10);
      this.cellierService.nouveauCellier(formData).subscribe(response => {
        this.snackBar.open('Votre cellier a été crée.', 'Fermer', {
          duration: 3000
        });
        this.dialogRef.close();
      });
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }

}
