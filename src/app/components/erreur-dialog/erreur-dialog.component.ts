import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-erreur-dialog',
  templateUrl: './erreur-dialog.component.html',
  styleUrls: ['./erreur-dialog.component.scss']
})
export class ErreurDialogComponent {
  id_utilisateur:number = this.userService.getUtilisateur().id;

  formErreur: FormGroup = new FormGroup({
    erreur: new FormControl('', [Validators.minLength(3),Validators.required]),
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ErreurDialogComponent>, private userService: UserService
  ) {}

  ngOnInit(){
    this.formErreur = this.fb.group({
      erreur: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ajouterErreur(){
    let formData = this.formErreur.value;
    formData.id_user = this.id_utilisateur;
    this.dialogRef.close(formData);
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
