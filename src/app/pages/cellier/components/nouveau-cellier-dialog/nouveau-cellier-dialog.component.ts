import { Component } from '@angular/core';
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
  couleurs: Array<Couleur> = [];
  couleursSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NouveauCellierDialogComponent>,
    private snackBar: MatSnackBar,
    private cellierService: CellierService
  ) {
    this.formAjout = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      id_couleur: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.couleursSubscription = this.cellierService.getCouleurs().subscribe((data) => {
      console.log(data);
      this.couleurs = data;
      if (this.couleurs.length > 0 && this.couleurs[0] != null) {
        this.formAjout.controls['id_couleur'].setValue(this.couleurs[0].id || 1);
      }
    });
  }

  ajouterCellier(): void {
    if (this.formAjout.valid) {
      const formData = this.formAjout.value;
      formData.id_couleur = parseInt(formData.id_couleur, 10);
      // Instead of subscribing here, emit the formData to the parent component
      this.dialogRef.close(formData);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
