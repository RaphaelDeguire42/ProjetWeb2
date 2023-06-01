import { Component, Inject, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CellierBouteille } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-modifier-bouteille-dialog',
  templateUrl: './modifier-bouteille-dialog.component.html',
  styleUrls: ['./modifier-bouteille-dialog.component.scss']

})
export class ModifierBouteilleDialogComponent {
  formModif: FormGroup = new FormGroup({});
  labelColor: string = "rgba(0,0,0,0.6)";

  changeLabelColor() {
    this.labelColor = 'black';
  }

  resetLabelColor() {
    this.labelColor = '';
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CellierBouteille>, private snackBar: MatSnackBar, private catalogueService: CatalogueService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.formModif = this.fb.group({
      nom: [this.data.nom, [Validators.required, Validators.minLength(3)]],
      prix: [this.data.prix, Validators.required],
      actif: new FormControl(this.data.actif),
    });
  }

  modifierBouteille(){
    if (this.formModif.valid) {
      let formData = this.formModif.value;
      formData.id = this.data.id;
      const updatedData = {
        ...this.data,
        prix: formData.prix,
        nom: formData.nom,
        actif: formData.actif
      };
      this.dialogRef.close(updatedData);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
