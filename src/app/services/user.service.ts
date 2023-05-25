import { Injectable } from '@angular/core';
import { Login, Role, Utilisateur } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const USER_BASE_URL = 'http://localhost:8001/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string = '';

  httpOption = {
  headers: new HttpHeaders({
    'Accept' : 'application/json',
    'Content-type': 'application/json',
    'Authorization' : 'Bearer ' + this.token
  })};

  utilisateur:Utilisateur = {
    id: 1 ,
    nom: "alex",
    email: "amama@"
  };
  estConnecter:boolean = true;

  constructor(private httpClient: HttpClient) { }

  getUtilisateur():Utilisateur{
    return this.utilisateur;
  }

  isConnecter():boolean{
    return this.estConnecter;
  }

  connexion(login:Login){

  }

}
