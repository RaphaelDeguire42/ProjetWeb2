import { Component, EventEmitter, Input, Output, ElementRef, OnInit, Renderer2  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bouteille } from 'src/app/models/models';
import { AjouterBouteilleDialogComponent } from '../ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';
import { CellierService } from 'src/app/services/cellier.service';
import { ModifierBouteilleDialogComponent } from '../modifier-bouteille-dialog/modifier-bouteille-dialog.component';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-une-bouteille',
  templateUrl: './une-bouteille.component.html',
  styleUrls: ['./une-bouteille.component.scss']
})
export class UneBouteilleComponent {
  @Input() modePleinEcran = false;
  @Input() bouteille: Bouteille | undefined;
  @Output() bouteilleSupprime: EventEmitter<number> = new EventEmitter<number>();
  @Output() bouteilleModifiee: EventEmitter<Bouteille> = new EventEmitter<Bouteille>();
  @Output() ajouterAuPanier = new EventEmitter();


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private cellierService: CellierService, private panierService: PanierService, private catalogueService: CatalogueService,private router: Router, private renderer: Renderer2, private elementRef: ElementRef){}

  async ngOnInit() {
    await this.loadFacebookSdk();
    this.createFacebookShareButton();
  }

  private createFacebookShareButton() {
    const url = this.bouteille!.url_saq;
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'fb-share-button');
    this.renderer.setAttribute(div, 'data-href', url);
    this.renderer.setAttribute(div, 'data-layout', 'button_count');

    const container = this.elementRef.nativeElement.querySelector('#facebook-share-button-container');
    this.renderer.appendChild(container, div);

    // Load Facebook SDK after adding the button to the DOM
    this.loadFacebookSdk();
  }

  onAjouterAuPanier(): void {
    this.ajouterAuPanier.emit(this.bouteille);
    const item = {
      id: this.bouteille!.id,
      nom: this.bouteille!.nom,
      prix: this.bouteille!.prix,
      quantite: 1
    }
    this.panierService.ajouterAuPanier(item)

  }

  openAjouterBouteilleDialog(id_bouteille:number){
    console.log(this.bouteille)
    const dialogRef = this.dialog.open(AjouterBouteilleDialogComponent, {
      width: '450px',
      height: '600px',
      data: { id_bouteille }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        result.type = this.bouteille!.type
        result.format = this.bouteille!.format
        result.pays = this.bouteille!.pays
        this.cellierService.ajouterBouteilleCellier(result).subscribe(response => {
          this.snackBar.open('Votre bouteille a été ajouté au cellier.', 'Fermer', {duration: 3000});
        })
      }
    });
  }

  openModifierBouteilleDialog(id_bouteille:number){
    const dialogRef = this.dialog.open(ModifierBouteilleDialogComponent, {
      width: '350px',
      data: { id_bouteille, ...this.bouteille },
    });

    dialogRef.afterClosed().subscribe((bouteilleModifiee) => {
      if(bouteilleModifiee){
        this.catalogueService.modifierBouteille(bouteilleModifiee).subscribe(response => {
          if(response){
            this.snackBar.open('Votre bouteille a été modifiée.', 'Fermer', {duration: 3000});
            this.bouteille = bouteilleModifiee;
            this.bouteilleModifiee.emit(bouteilleModifiee);
          }
        })
      }
    });
  }

  navigateToBouteille(bouteilleId: number) {
    this.router.navigate(['/bouteille', bouteilleId]);
  }

  supprimerBouteille(id_bouteille_cellier: number): void {
    console.log(id_bouteille_cellier);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes-vous certain de vouloir supprimer cette bouteille?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.catalogueService.supprimerBouteille(id_bouteille_cellier).subscribe(() => {
          this.bouteilleSupprime.emit(id_bouteille_cellier);
          this.snackBar.open(`La bouteille a été supprimée.`, 'Fermer', {duration: 3000});
        });
      }
    });
  }

  private loadFacebookSdk(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const d = document;
      const s = 'script';
      const id = 'facebook-jssdk';

      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        resolve();
        return;
      }

      const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=229764299767822&autoLogAppEvents=1';
      js.onload = () => resolve();
      js.onerror = () => reject();
      fjs.parentNode!.insertBefore(js, fjs);
    });
  }


}
