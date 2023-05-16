import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille,TypeBouteille, Format, Pays } from '../models/models';

const CATALOGUE_BASE_URL = 'localhost:8000';

// Reste de l'uri pour l'api pour toutes les bouteilles : api_vino/public/api/bouteilles
// J'ai implémenté plusieurs mots clés pour les recherches et filtres dans le uri des bouteilles 
// les mots clés permis pour chaques colonnes sont dans cet array ici : 
//    'id' => ['eq', 'gt'],
//    'nom' => ['eq', 'lk'],
//    'prix' => ['eq', 'gt', 'lt', 'lte', 'gte'],
//    'id_format' => ['eq'],
//    'id_pays' => ['eq'],
//    'id_type' => ['eq'],
// la traduction est ici 
//    'eq'    => '=',
//    'lt'    => '<',
//    'lte'   => '<=',
//    'gt'    => '>',
//    'gte'   => '>=',
//    'lk'    => 'like',

// Exemples

// CATALOGUE_BASE_URL/api_vino/public/api/bouteilles?COLONNE[OPERATEURSQL]=VALEUR  

// CATALOGUE_BASE_URL/api_vino/public/api/bouteilles?nom[lk]=the  
// retourne un array qui contiens toutes les bouteilles dont le nom contiens le mot "the"

// CATALOGUE_BASE_URL/api_vino/public/api/bouteilles?id_format[eq]=1
// retourne un array de tous les bouteille de format 1







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
    },{
      id: 2,
      nom: 'Vin du millenaire',
      code_saq: '202504',
      url_saq: 'www.com',
      img_saq: 'url.webp',
      garde: 2001,
      prix: 50,
      id_type: 2,
      id_format: 1,
      id_pays: 2,
      actif: true
    }];

    return of(bouteilles);
    //return this.httpClient.get<Array<Bouteille>>(`${CATALOGUE_BASE_URL}/bouteille`)
  }

  getTypes(): Observable<Array<TypeBouteille>> {
    return of([
      {id:1, type: 'Vin Blanc'},
      {id:2, type: 'Vin Rouge'}
    ]);
    //return this.httpClient.get<Array<TypeBouteille>>(`${CATALOGUE_BASE_URL}/type`)
  }

  getFormats(): Observable<Array<Format>> {
    return of([
      {id:1, format: '750 ml'},
      {id:2, format: '1000 ml'}
    ]);
    //return this.httpClient.get<Array<Format>>(`${CATALOGUE_BASE_URL}/format`)

  }

  getPays(): Observable<Array<Pays>> {
    return of([
      {id:1, pays: 'Argentine'},
      {id:2, pays: 'France'}
    ]);
    //return this.httpClient.get<Array<Pays>>(`${CATALOGUE_BASE_URL}/pays`)
  }

  getNouvelleBouteilles(): Observable<Array<Bouteille>>{
    return this.httpClient.get<Array<Bouteille>>(CATALOGUE_BASE_URL+'crawl');
  }
}
