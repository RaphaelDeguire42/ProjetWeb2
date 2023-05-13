import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})

export class ErreurComponent {
  @Output() annulerEvent = new EventEmitter<void>();
  formErreur: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http:HttpClient, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.formErreur = this.fb.group({
      erreur: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ajouterErreur(){
    const formValue = this.formErreur.value;
    this.http.post('signaler-erreur', formValue).subscribe(response => {
      this.annulerEvent.emit();
      this.snackBar.open('Merci, votre erreur a été signalée.', 'Fermer', {
        duration: 3000
      });
    });
  }

  annuler(){
    document.querySelector('.signalerErreur')!.classList.remove('hide');
    document.querySelector('.erreurBox')!.classList.add('hide')
  }
}

