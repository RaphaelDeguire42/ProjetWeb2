import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NouveauCellierDialogComponent } from '../nouveau-cellier-dialog/nouveau-cellier-dialog.component';



@Component({
  selector: 'app-nouveau-cellier',
  templateUrl: './nouveau-cellier.component.html',
  styleUrls: ['./nouveau-cellier.component.scss']
})
export class NouveauCellierComponent{

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar){}

  openNouveauCellierDialog(){
    const dialogRef = this.dialog.open(NouveauCellierDialogComponent, {
      width: '450px',
      height: '600px'
    });
  }
}
