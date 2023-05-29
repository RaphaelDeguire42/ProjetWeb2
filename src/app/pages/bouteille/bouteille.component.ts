import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bouteille, UneBouteille } from 'src/app/models/models';
import { BouteilleService } from 'src/app/services/bouteille.service';

@Component({
  selector: 'app-bouteille',
  templateUrl: './bouteille.component.html',
  styleUrls: ['./bouteille.component.scss']
})
export class BouteilleComponent {
  bouteille:any;
  formBouteille: FormGroup;


  constructor(private route:ActivatedRoute, private router: Router, private bouteilleService: BouteilleService, private fb: FormBuilder ){
    this.formBouteille = this.fb.group({
      commentaire: ['']
    });
    this.route.params.subscribe((param) => {
     const id_bouteille = param['id'];
     this.bouteilleService.getUneBouteille(id_bouteille).subscribe((bouteille)=>{
      this.bouteille = bouteille.data;
      console.log(this.bouteille)
     })
    })
  }

  ngOnInit(){

  }

  envoyerCommentaire(){

  }
}
