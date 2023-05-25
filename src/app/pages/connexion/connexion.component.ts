import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value) {
    return null;
  }

  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*]/.test(value);

  const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  return isValid ? null : { invalidPassword: true };
}

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  formConnexion: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.formConnexion = this.fb.group({
      courriel: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, passwordValidator]],
    });
  }

  connexion() {
    const formData = this.formConnexion.value;
    this.userService.connexion(formData)
  }
}
