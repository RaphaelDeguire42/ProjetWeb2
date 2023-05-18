import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille, BouteilleCellierData, Cellier, CellierBouteille, Couleur, NouveauCellierData } from '../models/models';
import { UserService } from './user.service';

const CELLIER_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class CellierService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getCouleurs(): Observable<Array<Couleur>> {
    return this.httpClient.get<Array<Couleur>>(`${CELLIER_BASE_URL}/couleurs`)
  }

  getCelliersUtilisateur(): Observable<Array<Cellier>> {
      const id_utilisateur = this.userService.getUtilisateur().id;
      return this.httpClient.get<Array<Cellier>>(`${CELLIER_BASE_URL}/celliers?id_user[eq]=${id_utilisateur}`)
   }

   getBouteillesCellier(id_cellier:number): Observable<Array<CellierBouteille>> {
      return this.httpClient.get<Array<CellierBouteille>>(`${CELLIER_BASE_URL}/cellier-bouteilles?id_cellier[eq]=${id_cellier}`)
   }

   ajouterBouteilleCellier(data:BouteilleCellierData):Observable<any>{
    return this.httpClient.post(`${CELLIER_BASE_URL}/cellier-bouteilles`, data);
   }

   supprimerBouteilleCellier(id_bouteille_cellier:number):Observable<any>{
    return this.httpClient.delete(`${CELLIER_BASE_URL}/cellier-bouteilles/${id_bouteille_cellier}`);
   }

   nouveauCellier(data:NouveauCellierData):Observable<any>{
    return this.httpClient.post(`${CELLIER_BASE_URL}/celliers`, data);
   }

   supprimerCellier(id_cellier:number):Observable<any>{
    return this.httpClient.delete(`${CELLIER_BASE_URL}/celliers/${id_cellier}`);
   }
}
