import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bouteille, UneBouteille } from 'src/app/models/models';
import { BouteilleService } from 'src/app/services/bouteille.service';

@Component({
  selector: 'app-bouteille',
  templateUrl: './bouteille.component.html',
  styleUrls: ['./bouteille.component.scss']
})
export class BouteilleComponent {
  bouteille:UneBouteille = {} as UneBouteille;

  constructor(private route:ActivatedRoute, private router: Router, private bouteilleService: BouteilleService ){
    this.route.params.subscribe((param) => {
     const id_bouteille = param['id'];
     this.bouteilleService.getUneBouteille(id_bouteille).subscribe((bouteille)=>{
      this.bouteille = bouteille;
      console.log(this.bouteille)
      this.bouteille.noteCommentaire = [
        {
        note: 5,
        commentaire: 'atomique',
        id:8},
        {
        note: 2,
        commentaire: 'sulfruique',
        id:2
        }
      ]
     })
    })
  }

  ngOnInit(){

  }
}
