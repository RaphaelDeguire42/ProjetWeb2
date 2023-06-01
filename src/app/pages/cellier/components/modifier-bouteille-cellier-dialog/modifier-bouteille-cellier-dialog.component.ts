import { Component, Inject, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CellierBouteille } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';

@Component({
  selector: 'app-modifier-bouteille-cellier-dialog',
  templateUrl: './modifier-bouteille-cellier-dialog.component.html',
  styleUrls: ['./modifier-bouteille-cellier-dialog.component.scss']

})

export class ModifierBouteilleCellierDialogComponent {
  formModif: FormGroup = new FormGroup({});
  labelColor: string = "rgba(0,0,0,0.6)";

  changeLabelColor() {
    this.labelColor = 'black';
  }

  resetLabelColor() {
    this.labelColor = '';
  }

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<CellierBouteille>, private snackBar: MatSnackBar, private cellierService: CellierService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.formModif = this.fb.group({
      nom: [this.data.nom, [Validators.required, Validators.minLength(3)]],
      quantite: [this.data.quantite, Validators.required],
      date_achat: [new Date(this.data.date_achat), Validators.required],
      millesime: [this.data.millesime, Validators.required],
      garde: [this.data.garde, Validators.required],
    });
  }

  modifierBouteille(){
    if (this.formModif.valid) {
      let formData = this.formModif.value;
      formData.id = this.data.id;
      this.dialogRef.close(formData);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
