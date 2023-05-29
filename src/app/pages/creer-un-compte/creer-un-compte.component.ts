import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  if (!value) return null;

  //const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  //const hasSpecialChar = /[!@#$%^&*]/.test(value);
  const isValid = /*hasUppercase && */hasLowercase && hasNumber /*&& hasSpecialChar*/;
  return isValid ? null : { invalidPassword: true };
}

function passwordConfirmationValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('password_confirmation')?.value;

  return password === passwordConfirmation ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-creer-un-compte',
  templateUrl: './creer-un-compte.component.html',
  styleUrls: ['../connexion/connexion.component.scss']
})

export class CreerUnCompteComponent {
  formConnexion: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router) {}

  ngOnInit() {
    this.formConnexion = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      password_confirmation: ['', Validators.required]
    }, { validators: passwordConfirmationValidator });
  }


  creerUnCompte() {
    let formData = this.formConnexion.value;
    this.userService.creerUnCompte(formData).subscribe((response) => {
      this.router.navigate(['/connexion']);

    });
  }
}
