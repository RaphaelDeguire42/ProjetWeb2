import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Couleur } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boire-bouteille-dialog',
  templateUrl: './boire-bouteille-dialog.component.html',
  styleUrls: ['./boire-bouteille-dialog.component.scss']
})
export class BoireBouteilleComponent {
  formBoire: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BoireBouteilleComponent>,) {
    this.formBoire = this.fb.group({
      commentaire: [''],
      note: ['', [Validators.min(1), Validators.max(5)]]
    });
  }

  envoyerNote(): void {
    if (this.formBoire.valid) {
      const formData = this.formBoire.value;
      this.dialogRef.close(formData);
    }
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
