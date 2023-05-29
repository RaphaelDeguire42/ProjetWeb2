import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PanierComponent } from './pages/panier/panier.component';
import { CellierComponent } from './pages/cellier/cellier.component';
import { BouteilleComponent } from './pages/bouteille/bouteille.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AuthGuard } from './auth.guard';
import { CreerUnCompteComponent } from './pages/creer-un-compte/creer-un-compte.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'cellier', component: CellierComponent, canActivate: [AuthGuard] },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'creer-un-compte', component: CreerUnCompteComponent },
  { path: 'bouteille/:id', component: BouteilleComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
