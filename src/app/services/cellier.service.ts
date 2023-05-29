import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille, AjoutBouteilleCellierData, Cellier, CellierBouteille, Couleur, NouveauCellierData } from '../models/models';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const CELLIER_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class CellierService {

  constructor(private httpClient: HttpClient, private userService: UserService, private snackBar: MatSnackBar) { }

  getCouleurs(): Observable<any> {
    console.log(this.userService.getSanctum())
    return this.httpClient.get<Array<Couleur>>(`${CELLIER_BASE_URL}/couleurs`, this.userService.getSanctum())
  }

  getCelliersUtilisateur(id_user:number): Observable<any> {
      return this.httpClient.get<Array<Cellier>>(`${CELLIER_BASE_URL}/celliers?id_user[eq]=${id_user}&incluBouteilles=true`)
   }

   getCelliersUtilisateurSeulement(): Observable<any> {
    const id_utilisateur = this.userService.getUtilisateur().id;
    return this.httpClient.get<Array<Cellier>>(`${CELLIER_BASE_URL}/celliers?id_user[eq]=${id_utilisateur}`)
 }

   getBouteillesCellier(id_cellier:number): Observable<Array<CellierBouteille>> {
      return this.httpClient.get<Array<CellierBouteille>>(`${CELLIER_BASE_URL}/cellier-bouteilles?id_cellier[eq]=${id_cellier}`)
   }

   ajouterBouteilleCellier(data:AjoutBouteilleCellierData):Observable<any>{
    return this.httpClient.post(`${CELLIER_BASE_URL}/cellier-bouteilles`, data);
   }

   modifierBouteilleCellier(data:CellierBouteille):Observable<any>{
    const id_bouteille_cellier = data.id;
    return this.httpClient.put(`${CELLIER_BASE_URL}/cellier-bouteilles/${id_bouteille_cellier}`, data);
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

   ajouterQteBouteille(bouteille:CellierBouteille){
     bouteille.quantite += 1;
     this.httpClient.patch<any>(`${CELLIER_BASE_URL}/cellier-bouteilles/${bouteille.id}`, {quantite: bouteille.quantite}).subscribe((response)=>{})
   }
   soustraireQteBouteille(bouteille:CellierBouteille){
      this.httpClient.patch<any>(`${CELLIER_BASE_URL}/cellier-bouteilles/${bouteille.id}`, {quantite: bouteille.quantite}).subscribe((response)=>{})
  }
}
