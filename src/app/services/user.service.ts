import { Injectable } from '@angular/core';
import { Compte, Login, Role, Utilisateur } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const USER_BASE_URL = 'http://localhost:8000/api';
const TOKEN_KEY = 'user_id'; // Key to store the authentication token


@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = '';

  httpOption = {};
  role: number | undefined = 0;

  utilisateur: Utilisateur = {} as Utilisateur;

  estConnecter: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadToken();
    this.updateHttpOption();
  }

  getUtilisateur(): Utilisateur | any {
    return this.utilisateur;
  }

  isConnecter(): boolean {
    return this.estConnecter;
  }

  connexion(login: Login): Observable<any> {
    return this.httpClient.post<Login>(`${USER_BASE_URL}/login`, login);
  }

  creerUnCompte(compte: Compte): Observable<any> {
    console.log('userSErvices')
    return this.httpClient.post<Compte>(`${USER_BASE_URL}/register`, compte);
  }

  nouvelleConnexion(login: Login): void {
    this.connexion(login).subscribe((data) => {
      if (data) {
        console.log(data);
        this.token = data.token;
        this.utilisateur = data.user;
        this.estConnecter = true;
        this.saveUserData();
        this.updateHttpOption();
        this.router.navigate(['/accueil']);
      }
    });
  }

  deconnexion(): void {
    this.token = ''; // Clear the token
    this.estConnecter = false;
    this.clearToken(); // Remove the token from storage
    this.router.navigate(['/connexion']);
  }

  getRole(): Observable<any> {
    const id_user = this.getUtilisateur().id;
    return this.httpClient.get<any>(`${USER_BASE_URL}/users?id[eq]=${id_user}`, this.getSanctum())
  }

  private updateHttpOption(): void {
    this.httpOption = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }


  private loadToken(): void {
    const data = localStorage.getItem(TOKEN_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      this.token = parsedData.token || '';
      this.utilisateur.id = parseInt(parsedData.id, 10) || 0;
    }
  }

  private saveUserData(): void {
    const data = {
      id: this.utilisateur.id.toString(),
      token: this.token
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  }

  private clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getSanctum() {
    return this.httpOption;
  }
}
