import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille, BouteilleCellierData, Cellier, CellierBouteille, Couleur, NouveauCellierData } from '../models/models';

const CELLIER_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class CellierService {

  constructor(private httpClient: HttpClient) { }

  getCouleurs(): Observable<Array<Couleur>> {
    return this.httpClient.get<Array<Couleur>>(`${CELLIER_BASE_URL}/couleurs`)
  }


  getCelliersUtilisateur(): Observable<Array<Cellier>> {
    const celliers: Array<Cellier> = [{
        id: 1,
        nom: 'Cellier 1',
        id_user: 1,
        id_couleur: 2
      },
      {
        id: 2,
        nom: 'Cellier 2',
        id_user: 1,
        id_couleur: 1
      }];
      return of(celliers);
      //return this.httpClient.get<Array<Cellier>>(`${CELLIER_BASE_URL}/cellier-utilisateur`)
   }

   getBouteillesCellier(): Observable<Array<CellierBouteille>> {
    const bouteilleCellier: Array<CellierBouteille> = [{
        id: 1,
        id_bouteille: 1,
        id_cellier: 1,
        quantite: 3,
        date_achat: '2000-05-20',
        garde: 2008,
        millesime: 2007
      },
      {
        id: 2,
        id_bouteille: 2,
        id_cellier: 1,
        quantite: 3,
        date_achat: '2000-05-25',
        garde: 2010,
        millesime: 2008
      }];

      return of(bouteilleCellier);
      //return this.httpClient.get<Array<CellierBouteille>>(`${CELLIER_BASE_URL}/bouteille-cellier`)
   }

   ajouterBouteilleCellier(data:BouteilleCellierData):Observable<any>{
    return this.httpClient.post(CELLIER_BASE_URL+'bouteille-cellier', data);
   }

   nouveauCellier(data:NouveauCellierData):Observable<any>{
    return this.httpClient.post(`${CELLIER_BASE_URL}/cellier`, data);
   }

   supprimerCellier(id_cellier:number):Observable<any>{
    this.httpClient.delete(CELLIER_BASE_URL+`cellier/${id_cellier}`);
    return of(id_cellier);
   }
}
