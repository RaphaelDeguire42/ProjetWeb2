import { Injectable } from '@angular/core';
import { Login, Role, Utilisateur } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const USER_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = '';

  httpOption = {};
  role:number|undefined = 0;

  //utilisateur: Utilisateur = {} as Utilisateur;
  utilisateur ={id:1,id_role:1};
  estConnecter: boolean = true;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.updateHttpOption();
  }

  getUtilisateur(): Utilisateur|any {
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

  getRole():number|undefined{
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

  getSanctum(){
    return this.httpOption;
  }
}
