import { Injectable } from '@angular/core';
import { Role, Utilisateur } from '../models/models';
import { HttpClient } from '@angular/common/http';

const USER_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  utilisateur:Utilisateur = {
    id: 1 ,
    nom: "alex",
    email: "amama@"
  };
  estConnecter:boolean = false;

  constructor(private httpClient: HttpClient) { }

  getUtilisateur():Utilisateur{
    return this.utilisateur;
  }

  isConnecter():boolean{
    return this.estConnecter;
  }

}
