import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille, BouteilleCellierData, Cellier, CellierBouteille, Couleur, NouveauCellierData } from '../models/models';

const CELLIER_BASE_URL = 'localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class CellierService {

  constructor(private httpClient: HttpClient) { }

  getCouleurs(): Observable<Array<Couleur>> {
    const couleurs: Array<Couleur> = [
      { id: 1, couleur: 'black', hex: '#000000' },
      { id: 2, couleur: 'white', hex: '#ffffff' },
      { id: 3, couleur: 'red', hex: '#ff0000' },
      { id: 4, couleur: 'green', hex: '#00ff00' },
      { id: 5, couleur: 'blue', hex: '#0000ff' },
      { id: 6, couleur: 'yellow', hex: '#ffff00' },
      { id: 7, couleur: 'magenta', hex: '#ff00ff' },
      { id: 8, couleur: 'cyan', hex: '#00ffff' },
      { id: 9, couleur: 'maroon', hex: '#800000' },
      { id: 10, couleur: 'olive', hex: '#008000' },
      { id: 11, couleur: 'navy', hex: '#000080' },
      { id: 12, couleur: 'teal', hex: '#808000' },
      { id: 13, couleur: 'purple', hex: '#800080' },
      { id: 14, couleur: 'dark_cyan', hex: '#008080' },
      { id: 15, couleur: 'grey', hex: '#808080' },
    ];
    return of(couleurs);
   // return this.httpClient.get<Array<Couleur>>(`${CELLIER_BASE_URL}/couleur`)
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
    return this.httpClient.post(CELLIER_BASE_URL+'cellier', data);
   }

   supprimerCellier(id_cellier:number):Observable<any>{
    this.httpClient.delete(CELLIER_BASE_URL+`cellier/${id_cellier}`);
    return of(id_cellier);
   }
}
