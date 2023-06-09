import { Component, EventEmitter, OnDestroy, OnInit, Output, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bouteille, Cellier } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { CellierService } from 'src/app/services/cellier.service';
import { UserService } from 'src/app/services/user.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit, OnDestroy {
  types: number[] | undefined;
  formats: number[] | undefined;
  pays: number[] | undefined;
  bouteilles: any | null ;
  bouteilleSubscription: Subscription | undefined;
  celliers: Array<Cellier> | undefined;
  tri = 'desc';
  cellierSubscription: Subscription | undefined;
  isChargement = false;
  originalBouteilles: any[] = [];
  role:boolean = false;

  @ViewChild('drawer') drawer!: MatDrawer;


  constructor(private catalogueService: CatalogueService, private cellierService: CellierService, private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.getBouteilles();
      this.role = this.userService.getRole();
  }

  isMinWidth1000px(): boolean {
    return window.innerWidth >= 1000;
  }

  /**
   * Ferme le drawer quand la fenêtre a moins de 1000px
   */
  @HostListener('window:resize')
  onWindowResize() {
    this.cdRef.detectChanges();
  };

  /**
   * Toggle le drawer lorsqu'on appuie sur le bouton 'Filtres'
   */
  toggleDrawer():void {
    if(this.drawer) {
      this.drawer.toggle();
    }
  }

  closeDrawer():void {
    this.drawer.close();
  }

  getBouteilles(): void {
    this.bouteilleSubscription = this.catalogueService.getAllBouteilles(this.tri, this.types, this.formats, this.pays).subscribe((_bouteilles)=>{
      if (_bouteilles) {
        this.bouteilles = null;
        this.originalBouteilles = _bouteilles.data;
        this.bouteilles = this.originalBouteilles;
      }
    })
  }

  getNouvelleBouteilles(): void{
    this.isChargement = true;
    this.catalogueService.getNouvelleBouteilles().subscribe(bouteilles =>{
      const aBouteille = bouteilles.nouvellesBouteilles;
      this.bouteilles!.push(...aBouteille);
      this.isChargement = false;
    })
  }

  getCelliersUtilisateur(): void {
    const id_user = parseInt(localStorage.getItem('user_id')||'');
    this.cellierSubscription = this.cellierService.getCelliersUtilisateur(id_user).subscribe((_celliers)=>{
      this.celliers = _celliers
    })
  }

  onVoirType(nouveauTypes:number[]):void {
    this.types = nouveauTypes;
    this.getBouteilles();
  }

  onVoirFormat(nouveauFormats:number[]):void {
    this.formats = nouveauFormats;
    this.getBouteilles();
  }

  onVoirPays(nouveauPays: number[]): void {
    this.pays = nouveauPays;
    this.getBouteilles();
  }

  onTriChangement(nouveauTri: string):void {
    this.tri = nouveauTri;
    this.getBouteilles();
  }

  ngOnDestroy(): void {
      if(this.bouteilleSubscription)
        this.bouteilleSubscription.unsubscribe();
      if(this.cellierSubscription)
        this.cellierSubscription.unsubscribe();
  }

  supprimerBouteille(id_bouteille:number){
    this.bouteilles = this.bouteilles.filter((bouteille:any) => bouteille.id !== id_bouteille);
  }

  modifierBouteille(bouteilleModifiee: Bouteille) {
    const index = this.bouteilles?.findIndex((bouteille:any) => bouteille.id === bouteilleModifiee.id);
    if (index !== undefined && index !== -1) {
      this.bouteilles![index] = bouteilleModifiee;
    }
  }

  recherche(event: Event) {
    const target = event.target as HTMLInputElement;
    const filterValue = target.value.toLowerCase().trim();

    this.bouteilles = this.originalBouteilles!.filter((bouteille: Bouteille) => {
        const name = bouteille.nom.toLowerCase();
        return name.includes(filterValue);
    });
  }

  getColumnCount(): number {
    if (window.innerWidth >= 1800) {
      return 5; // Set the number of columns for window width >= 1800px
    } else if (window.innerWidth >= 1400) {
      return 4; // Set the number of columns for window width >= 1400px
    } else if (window.innerWidth >= 1200) {
      return 3; // Set the number of columns for window width >= 1200px
    } else if (window.innerWidth >= 600) {
      return 2; // Set the number of columns for window width >= 600px
    } else {
      return 1; // Set the number of columns for window width < 600px
    }
  }
}
