import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoteCommentaire, UneBouteille } from '../models/models';
import { UserService } from './user.service';

const BOUTEILLE_BASE_URL = 'http://localhost:8000/api';
//const BOUTEILLE_BASE_URL = 'http://localhost:8000/api/bouteilles';

@Injectable({
  providedIn: 'root'
})
export class BouteilleService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getUneBouteille(id_bouteille:number): Observable<any> {
    return this.httpClient.get<any>(`${BOUTEILLE_BASE_URL}/bouteilles/${id_bouteille}`, this.userService.getSanctum())
  }

  envoyerNoteCommentaire(note_commentaire: NoteCommentaire): Observable<any>{
    return this.httpClient.post<any>(`${BOUTEILLE_BASE_URL}/note-commentaires`, note_commentaire, this.userService.getSanctum())
  }
}
