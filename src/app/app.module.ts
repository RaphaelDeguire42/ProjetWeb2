import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EnteteComponent } from './components/entete/entete.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BouteillesEnteteComponent } from './pages/accueil/components/bouteilles-entete/bouteilles-entete.component';
import { FiltresComponent } from './pages/accueil/components/filtres/filtres.component';
import { UneBouteilleComponent } from './pages/accueil/components/une-bouteille/une-bouteille.component';
import { PanierComponent } from './pages/panier/panier.component';
import { PanierService } from './services/panier.service';
import { CellierComponent } from './pages/cellier/cellier.component';
import { CellierService } from './services/cellier.service';
import { HttpClientModule } from '@angular/common/http';
import { CelliersEnteteComponent } from './pages/cellier/components/celliers-entete/celliers-entete.component';
import { UnCellierComponent } from './pages/cellier/components/un-cellier/un-cellier.component';
import { NouveauCellierDialogComponent } from './pages/cellier/components/nouveau-cellier-dialog/nouveau-cellier-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AjouterBouteilleDialogComponent } from './pages/accueil/components/ajouter-bouteille-dialog/ajouter-bouteille-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UneCellierBouteilleComponent } from './pages/cellier/components/une-cellier-bouteille/une-cellier-bouteille.component';
import { ModifierBouteilleCellierDialogComponent } from './pages/cellier/components/modifier-bouteille-cellier-dialog/modifier-bouteille-cellier-dialog.component';
import { ErreurComponent } from './components/erreur/erreur.component';
import { ErreurDialogComponent } from './components/erreur-dialog/erreur-dialog.component';
import { ModifierBouteilleDialogComponent } from './pages/accueil/components/modifier-bouteille-dialog/modifier-bouteille-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BouteilleComponent } from './pages/bouteille/bouteille.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';


@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    AccueilComponent,
    FiltresComponent,
    UneBouteilleComponent,
    BouteillesEnteteComponent,
    PanierComponent,
    CellierComponent,
    UnCellierComponent,
    CelliersEnteteComponent,
    NouveauCellierDialogComponent,
    AjouterBouteilleDialogComponent,
    ConfirmationDialogComponent,
    UneCellierBouteilleComponent,
    ModifierBouteilleCellierDialogComponent,
    ModifierBouteilleDialogComponent,
    ErreurComponent,
    ErreurDialogComponent,
    BouteilleComponent,
    ConnexionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [PanierService, CellierService, CellierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
