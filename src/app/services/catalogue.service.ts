import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille,TypeBouteille, Format, Pays } from '../models/models';
import { Erreur } from '../models/models';

const CATALOGUE_BASE_URL = 'http://localhost:8001/api';

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

  getAllBouteilles(limit = '12', sort = 'desc', types?: number[], formats?: number[], pays?: number[]): Observable<Array<Bouteille>> {
    let premier = true,
      queryString = '';

    if(types) {
      for (const type in types) {
        if(!premier) queryString += '&';
        queryString += `id_type[eq]=${types[type]}`;
        premier = false;
        }
      }


    if (formats) {
      for (const format in formats) {
        if (!premier) queryString += '&';
        queryString += `id_format[eq]=${formats[format]}`;
        premier = false
      }
    }

    if (pays) {
      for (const unPays in pays) {
        if (!premier) queryString += '&';
        queryString += `id_pays[eq]=${pays[unPays]}`;
        premier = false
      }
    }
    console.log(queryString)
    return this.httpClient.get<Array<Bouteille>>(`${CATALOGUE_BASE_URL}/bouteilles?
    ${queryString}`);

  }

  getTypes(): Observable<Array<TypeBouteille>> {
    return this.httpClient.get<Array<TypeBouteille>>(`${CATALOGUE_BASE_URL}/types`)
  }

  getFormats(): Observable<Array<Format>> {
    return this.httpClient.get<Array<Format>>(`${CATALOGUE_BASE_URL}/formats`)
  }

  getPays(): Observable<Array<Pays>> {
    return this.httpClient.get<Array<Pays>>(`${CATALOGUE_BASE_URL}/pays`)
  }

  getNouvelleBouteilles(): Observable<any>{
    return this.httpClient.get<Array<Bouteille>>(`${CATALOGUE_BASE_URL}/crawl`);
  }

  ajouterNouvelleErreur(erreur:Erreur): Observable<any>{
    return this.httpClient.post<Erreur>(`${CATALOGUE_BASE_URL}/erreur`, erreur);
  }

  modifierBouteille(bouteille: Bouteille): Observable<any>{
    const id_bouteille = bouteille.id;
    return this.httpClient.put<Bouteille>(`${CATALOGUE_BASE_URL}/bouteilles/${id_bouteille}`, bouteille)
  }
}
