import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Erreur } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

const ADMIN_BASE_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getAllErreur(): Observable<Array<Erreur>>{
    return this.httpClient.get<Array<Erreur>>(`${ADMIN_BASE_URL}/erreur`, this.userService.getSanctum());
  }

  supprimerErreur(id_erreur: number): Observable<any>{
    return this.httpClient.delete<any>(`${ADMIN_BASE_URL}/erreur/${id_erreur}`, this.userService.getSanctum())
  }

  getStats(): Observable<any>{
    return this.httpClient.get<any>(`${ADMIN_BASE_URL}/stats`, this.userService.getSanctum())
  }
}
