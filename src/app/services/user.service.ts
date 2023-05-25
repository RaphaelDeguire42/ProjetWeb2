import { Injectable } from '@angular/core';
import { Login, Role, Utilisateur } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const USER_BASE_URL = 'http://localhost:8001/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = '';

  httpOption = {};

  utilisateur: Utilisateur = {} as Utilisateur;
  estConnecter: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.updateHttpOption();
  }

  getUtilisateur(): Utilisateur {
    return this.utilisateur;
  }

  isConnecter(): boolean {
    return this.estConnecter;
  }

  connexion(login: Login): Observable<any> {
    return this.httpClient.post<Login>(`${USER_BASE_URL}/login`, login);
  }

  nouvelleConnexion(login: Login): void {
    this.connexion(login).subscribe((data) => {
      this.token = data.token;
      this.utilisateur = data.user;
      this.estConnecter = true;
      this.updateHttpOption();
      this.router.navigate(['/accueil']);
    });
  }

  private updateHttpOption(): void {
    this.httpOption = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }
}
