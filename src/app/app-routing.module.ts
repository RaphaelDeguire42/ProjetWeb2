import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PanierComponent } from './pages/panier/panier.component';
import { CellierComponent } from './pages/cellier/cellier.component';
import { BouteilleComponent } from './pages/bouteille/bouteille.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent},
  { path: 'cellier', component: CellierComponent},
  { path: 'panier',  component: PanierComponent},
  { path: 'connexion',  component: ConnexionComponent},
  { path: 'bouteille/:id',  component: BouteilleComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
