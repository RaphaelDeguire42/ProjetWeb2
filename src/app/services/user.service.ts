import { Injectable } from '@angular/core';
import { Login, Role, Utilisateur } from '../models/models';
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
    this.loadToken(); // Load token from storage on service initialization
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

  nouvelleConnexion(login: Login): void {
    this.connexion(login).subscribe((data) => {
      this.token = data.token;
      this.utilisateur = data.user;
      this.estConnecter = true;
      this.updateHttpOption();
      this.saveToken(); // Save token to storage
      this.router.navigate(['/accueil']);
    });
  }

  deconnexion(): void {
    this.token = ''; // Clear the token
    this.estConnecter = false;
    this.clearToken(); // Remove the token from storage
    this.router.navigate(['/connexion']);
  }

  getRole(): number | undefined {
    return this.utilisateur.id_role;
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

  private loadToken(): void {
    // Load token from localStorage
    this.token = localStorage.getItem(TOKEN_KEY) || '';
  }

  private saveToken(): void {
    // Generate a random string as the stored token
    const id_user = this.utilisateur.id.toString();
    localStorage.setItem(TOKEN_KEY, id_user);
  }

  private clearToken(): void {
    // Remove the token from localStorage
    localStorage.removeItem(TOKEN_KEY);
  }

  getSanctum() {
    return this.httpOption;
  }
}
