import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nouveau-cellier-dialog',
  templateUrl: './nouveau-cellier-dialog.component.html',
  styleUrls: ['./nouveau-cellier-dialog.component.scss']
})
export class NouveauCellierDialogComponent {
  formAjout: FormGroup = new FormGroup({});
  colors = [
    { id: 1, name: 'black', hex: '#000000' },
    { id: 2, name: 'white', hex: '#ffffff' },
    { id: 3, name: 'red', hex: '#ff0000' },
    { id: 4, name: 'green', hex: '#00ff00' },
    { id: 5, name: 'blue', hex: '#0000ff' },
    { id: 6, name: 'yellow', hex: '#ffff00' },
    { id: 7, name: 'magenta', hex: '#ff00ff' },
    { id: 8, name: 'cyan', hex: '#00ffff' },
    { id: 9, name: 'maroon', hex: '#800000' },
    { id: 10, name: 'olive', hex: '#008000' },
    { id: 11, name: 'navy', hex: '#000080' },
    { id: 12, name: 'teal', hex: '#808000' },
    { id: 13, name: 'purple', hex: '#800080' },
    { id: 14, name: 'dark_cyan', hex: '#008080' },
    { id: 15, name: 'grey', hex: '#808080' },
  ];

  constructor(private fb: FormBuilder, private http:HttpClient, public dialogRef: MatDialogRef<NouveauCellierDialogComponent>,private snackBar:MatSnackBar) { }
  ngOnInit(): void {
    this.formAjout = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      id_couleur: ['1', [Validators.required]]
    });
  }

  ajouterCellier() {
    if (this.formAjout.valid) {
      const formData = this.formAjout.value;
      formData.id_couleur = parseInt(formData.id_couleur, 10);
      this.http.post('nouveau-cellier', formData).subscribe(response => {
        this.snackBar.open('Votre cellier a été crée.', 'Fermer', {
          duration: 3000
        });
        this.dialogRef.close();
      });
    }
  }

  getColors() {
    return this.colors;
  }

  annuler(): void {
    this.dialogRef.close();
  }

}
