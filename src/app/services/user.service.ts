import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/models';

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

  constructor() { }

  getUtilisateur():Utilisateur{
    return this.utilisateur;
  }

  isConnecter():boolean{
    return this.estConnecter;
  }
}
