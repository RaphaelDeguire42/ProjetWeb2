import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bouteille,TypeBouteille, Format, Pays } from '../models/models';
import { Erreur } from '../models/models';
import { UserService } from './user.service';

const CATALOGUE_BASE_URL = 'http://localhost:8000/api';

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

  constructor(private httpClient: HttpClient, private userService: UserService) { }


  getAllBouteilles(prix?:string, types?: number[], formats?: number[], pays?: number[]): Observable<{data: Array<Bouteille>}> {
    let premier = true,
      queryString = '',
      queries = [
        Array(),
        Array(),
        Array()
      ]

    if(types) {
      let aType = queries[0];
      for (const type in types) {
        if(types.length == 1 )
          aType.push(`id_type[eq]=${types[type]}`);
        else
          aType.push(`id_type[]=${types[type]}`);
      }
    }


    if (formats) {
      let aFormat = queries[1];
      for (const format in formats) {
        if(formats.length == 1 )
          aFormat.push(`id_format[eq]=${formats[format]}`);
        else
          aFormat.push(`id_format[]=${formats[format]}`);
      }
    }

    if (pays) {
      let aPays = queries[2];
      for (const unPays in pays) {
        if(pays.length == 1 )
          aPays.push(`id_pays[eq]=${pays[unPays]}`);
        else
          aPays.push(`id_pays[]=${pays[unPays]}`);
      }
    }

    for (let i = 0; i < queries.length; i++) {
      let filtre = queries[i];
      for (let j = 0; j <  filtre.length; j++) {
        if(!premier) queryString += '&';
        queryString += filtre[j]
        premier = false
      }
    }

    if(prix){
      if(!premier) queryString += '&';
      queryString += `prix=${prix}`
      premier = false;
    }
    return this.httpClient.get<any>(`${CATALOGUE_BASE_URL}/bouteilles?
    ${queryString}`, this.userService.getSanctum());

  }

  getTypes(): Observable<any> {
    return this.httpClient.get<any>(`${CATALOGUE_BASE_URL}/types`, this.userService.getSanctum())
  }

  getFormats(): Observable<any> {
    return this.httpClient.get<any>(`${CATALOGUE_BASE_URL}/formats`,this.userService.getSanctum())
  }

  getPays(): Observable<any> {
    return this.httpClient.get<any>(`${CATALOGUE_BASE_URL}/pays`, this.userService.getSanctum())
  }

  getNouvelleBouteilles(): Observable<any>{
    return this.httpClient.get<Array<Bouteille>>(`${CATALOGUE_BASE_URL}/crawl`, this.userService.getSanctum());
  }

  ajouterNouvelleErreur(erreur:Erreur): Observable<any>{
    return this.httpClient.post<Erreur>(`${CATALOGUE_BASE_URL}/erreur`, erreur, this.userService.getSanctum());
  }

  modifierBouteille(bouteille: Bouteille): Observable<any>{
    const id_bouteille = bouteille.id;
    return this.httpClient.patch<Bouteille>(`${CATALOGUE_BASE_URL}/bouteilles/${id_bouteille}`, bouteille, this.userService.getSanctum())
  }

  supprimerBouteille(id_bouteille: number): Observable<any>{
    return this.httpClient.delete<Bouteille>(`${CATALOGUE_BASE_URL}/bouteilles/${id_bouteille}`, this.userService.getSanctum())
  }
}
