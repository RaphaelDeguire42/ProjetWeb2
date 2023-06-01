import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  if (!value) return null;

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
  passwordVisible = false;
  formConnexion: FormGroup = new FormGroup({});
  
  labelColor: string = "rgba(0,0,0,0.6)";

  changeLabelColor() {
    this.labelColor = 'black';
  }

  resetLabelColor() {
    this.labelColor = '';
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.formConnexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  connexion() {
    const formData = this.formConnexion.value;
    const isConnexion = this.userService.nouvelleConnexion(formData)
  }
}
