import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille } from '../models/models';

const CATALOGUE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private httpClient: HttpClient) { }

  getAllBouteilles(limit = '12', sort = 'desc', type?: string): Observable<Array<Bouteille>> {
    const bouteilles: Array<Bouteille> = [{
      id: 1,
      nom: 'Vin du siecle',
      code_saq: '20004',
      url_saq: 'www.com',
      img_saq: 'url.webp',
      garde: 2000,
      prix: 20,
      id_type: 1,
      id_format: 1,
      id_pays: 1,
      actif: true
    }];

    return of(bouteilles);
    /*
    return this.httpClient.get<Array<Bouteille>>(
      `${CATALOGUE_BASE_URL}/bouteilles${
        type ? '/type/' + type : ''
      }?sort=${sort}&limit=${limit}`
    )
    */
  }

  getAllTypes(): Observable<Array<string>> {
    return of(['Vin Blanc', 'Vin rouge']);
    /*
    return this.httpClient.get<Array<string>>(
      `${CATALOGUE_BASE_URL}/bouteilles/types`
    )
    */
  }
}
