import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Panier, PanierItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  // supprimerDuPanier(item: PanierItem) {
  //   throw new Error('Method not implemented.');
  // }
  panier = new BehaviorSubject<Panier>({ items: []});
  constructor(private _snackbar: MatSnackBar) { }

  ajouterAuPanier(item: PanierItem): void {
    const items = [...this.panier.value.items];

    const itemPanier = items.find((_item) => _item.id == item.id);

    if (itemPanier) {
      itemPanier.quantite += 1;
    } else {
      items.push(item);
    }

    this.panier.next({ items });
    this._snackbar.open('1 item ajouté au panier.', 'Ok', { duration: 3000 });
  }

  supprimerQuantite(item: PanierItem): void {
    let itemASupprimer: PanierItem | undefined;

    let itemFiltre = this.panier.value.items.map((_item) => {
      if(_item.id === item.id) {
        _item.quantite--;

        if(_item.quantite === 0) {
          itemASupprimer = _item;
        }
      }
      return _item;
    });

    if (itemASupprimer) {
      itemFiltre = this.supprimerDuPanier(itemASupprimer, false);
    }

    this.panier.next({ items: itemFiltre })

    this._snackbar.open('1 item supprimé du panier.', 'Ok', {
      duration: 3000
    })
  }

  getTotal(items: Array<PanierItem>): number {
    return items.
      map((item) => item.prix * item.quantite)
      .reduce((prev, current) => prev + current, 0);
  }

  viderPanier(): void {
    this.panier.next({ items: [] });
    this._snackbar.open('Le panier a été supprimé.', 'OK', {
      duration: 3000
    });
  }

  supprimerDuPanier(item: PanierItem, update = true): Array<PanierItem> {
    const itemFiltre = this.panier.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if(update) {
      this.panier.next({ items: itemFiltre });
      this._snackbar.open('1item supprimé du panier.', 'Ok', {
        duration: 3000
      });
    }
    return itemFiltre;
  }



}
