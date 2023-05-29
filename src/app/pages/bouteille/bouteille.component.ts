import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bouteille, NoteCommentaire, UneBouteille } from 'src/app/models/models';
import { BouteilleService } from 'src/app/services/bouteille.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bouteille',
  templateUrl: './bouteille.component.html',
  styleUrls: ['./bouteille.component.scss']
})
export class BouteilleComponent {
  bouteille:any;
  note_commentaires: NoteCommentaire[] = [];

  formBouteille: FormGroup;


  constructor(private route:ActivatedRoute, private router: Router, private bouteilleService: BouteilleService,private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar ){
    this.formBouteille = this.fb.group({
      commentaire: [''],
      note: ['', [Validators.min(1), Validators.max(5)]]
    });
    this.route.params.subscribe((param) => {
     const id_bouteille = param['id'];
     this.bouteilleService.getUneBouteille(id_bouteille).subscribe((bouteille)=>{
      this.bouteille = bouteille.data;
      this.note_commentaires = this.bouteille.note_commentaires
     })
    })
  }

  ngOnInit(){

  }

  envoyerCommentaire() {
    const formData = this.formBouteille.value;
    if (formData.commentaire === "") delete formData.commentaire;
    if (formData.note === "") delete formData.note;
    formData.id_bouteille = this.bouteille.id;
    formData.id_user = this.userService.getUtilisateur().id;

    const existingNoteCommentaireIndex = this.note_commentaires.findIndex(
      nc => nc.id_user === formData.id_user
    );

    this.bouteilleService.envoyerNoteCommentaire(formData).subscribe((response) => {
      if (response) {
        if (existingNoteCommentaireIndex !== -1)
          this.note_commentaires[existingNoteCommentaireIndex] = response;
        else
          this.note_commentaires.push(response);
      }
    });
  }

}
