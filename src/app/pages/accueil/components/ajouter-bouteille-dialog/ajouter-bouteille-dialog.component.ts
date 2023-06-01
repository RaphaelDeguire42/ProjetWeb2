import { Component, Input, Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';

@Component({
  selector: 'app-ajouter-bouteille-dialog',
  templateUrl: './ajouter-bouteille-dialog.component.html',
  styleUrls: ['./ajouter-bouteille-dialog.component.scss']
})

export class AjouterBouteilleDialogComponent {
  id_bouteille:number|string|null = '';
  id_cellier:number|string|null = '';
  celliers: any | undefined;
  celliersSubscription: Subscription | undefined;
  labelColor: string = "rgba(0,0,0,0.6)";

  id_cellier_placeholder:number|string|null = null;

  formAjout: FormGroup = new FormGroup({
    id_cellier: new FormControl('', [Validators.required]),
    id_bouteille: new FormControl(''),
    garde: new FormControl('', Validators.required),
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    millesime: new FormControl('', Validators.required),
    date_achat: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    type: new FormControl('', ),
    format: new FormControl('',),
    pays: new FormControl('', ),
  });


  constructor(private fb: FormBuilder, private http:HttpClient, public dialogRef: MatDialogRef<AjouterBouteilleDialogComponent>,private snackBar:MatSnackBar, private cellierService: CellierService, @Inject(MAT_DIALOG_DATA) public data: { id_bouteille?: number, id_cellier?: number }
  ) {}

  changeLabelColor() {
    this.labelColor = 'black';
  }

  resetLabelColor() {
    this.labelColor = '';
  }

  ngOnInit(): void {
    this.id_bouteille = this.data.id_bouteille??null;
    this.id_cellier = this.data.id_cellier??null;
    this.celliersSubscription = this.cellierService.getCelliersUtilisateurSeulement().subscribe((celliersUser ) => {
      this.celliers = celliersUser.data;
      if(!this.id_bouteille){
        this.id_cellier_placeholder = this.id_cellier;
      } else {
        this.id_cellier_placeholder = this.celliers![0].id;
      }
      let formOptions: { [key: string]: any } = {
        id_cellier: [this.id_cellier_placeholder, [Validators.required]],
        id_bouteille: [this.id_bouteille],
        nom: [''],
        garde: ['', [Validators.required]],
        millesime: ['', [Validators.required]],
        date_achat: ['', [Validators.required]],
        quantite: [1, [Validators.required]],
        type: [''],
        format: [''],
        pays: [''],
      };
      this.formAjout = this.fb.group(formOptions);
    });
  }

  ajouterBouteilleCellier() {
    if (this.formAjout.valid || !this.id_bouteille) {
      let formData = this.formAjout.value;
      formData.url_img = "assets/img/placeholder_bottle.webp";
      this.dialogRef.close(formData);
    }
  }

  getCelliers() {
    return this.celliers;
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
