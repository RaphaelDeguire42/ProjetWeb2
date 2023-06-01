import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Erreur } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
   selector: "app-admin",
   templateUrl: "admin.component.html",
   styleUrls: ["admin.component.scss"],
})

export class AdminComponent {
   panelOpenState = false;
   erreurs: Array<Erreur> = [] as Array<Erreur>;
   stats: any;
   decompte_pays:any;
   decompte_types:any;
   users:any;

   constructor(private adminService: AdminService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

   ngOnInit(): void {
      this.adminService.getAllErreur().subscribe((_erreur) => {
         if (_erreur) this.erreurs = _erreur;
      });
      this.adminService.getStats().subscribe((stats)=>{
         console.log(stats)
         this.stats = stats;
         this.decompte_pays = stats.decompte_des_pays;
         this.decompte_types = stats.decompte_des_types;
         this.users = stats.decompte_users;
      })
   }

   removeErreur(erreur: Erreur): void {
      this.adminService.supprimerErreur(erreur.id).subscribe((response) => {
         this.snackBar.open("Erreur réglée!", "Fermer", { duration: 3000 });
         const index = this.erreurs.findIndex((e) => e.id === erreur.id);
         if (index !== -1) this.erreurs.splice(index, 1);
      });
   }

   supprimeUser(id_user:number){
   const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: '350px', data: 'Êtes-vous certain de vouloir supprimer cet utilisateur?' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.adminService.supprimerUtilisateur(id_user).subscribe(() => {
          this.users = this.users?.filter((user:any) => user.id !== id_user);
          this.snackBar.open(`La bouteille a été supprimée du cellier.`, 'Fermer', {duration: 3000});
        });
      }
    });
   }
}
