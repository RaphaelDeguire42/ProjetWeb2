import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille, Cellier } from '../models/models';

const CELLIER_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class CellierService {

  constructor(private httpClient: HttpClient) { }

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
    /*
    return this.httpClient.get<Array<string>>(
      `${CATALOGUE_BASE_URL}/bouteilles/types`
    )
    */
   }
}
