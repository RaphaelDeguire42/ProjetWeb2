import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Erreur } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';

@Component({
   selector: "app-admin",
   templateUrl: "admin.component.html",
   styleUrls: ["admin.component.scss"],
})

export class AdminComponent {
   panelOpenState = false;
   erreurs: Array<Erreur> = [] as Array<Erreur>;
   constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

   ngOnInit(): void {
      this.adminService.getAllErreur().subscribe((_erreur) => {
         if (_erreur) this.erreurs = _erreur;
      });
   }

   removeErreur(erreur: Erreur): void {
      this.adminService.supprimerErreur(erreur.id).subscribe((response) => {
         this.snackBar.open("Erreur réglée!", "Fermer", { duration: 3000 });
         const index = this.erreurs.findIndex((e) => e.id === erreur.id);
         if (index !== -1) this.erreurs.splice(index, 1);
      });
   }
}
