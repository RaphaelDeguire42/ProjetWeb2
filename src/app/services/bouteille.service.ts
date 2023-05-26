import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UneBouteille } from '../models/models';

const BOUTEILLE_BASE_URL = 'http://localhost:8000/api/bouteilles';
//const BOUTEILLE_BASE_URL = 'http://localhost:8000/api/bouteilles';

@Injectable({
  providedIn: 'root'
})
export class BouteilleService {

  constructor(private httpClient: HttpClient) { }

  getUneBouteille(id_bouteille:number): Observable<UneBouteille> {
    return this.httpClient.get<UneBouteille>(`${BOUTEILLE_BASE_URL}/${id_bouteille}`)
  }
}
