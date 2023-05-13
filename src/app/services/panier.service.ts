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

  addToPanier(item: PanierItem): void {
    const items = [...this.panier.value.items];

    const itemInPanier = items.find((_item) => _item.id == item.id);

    if (itemInPanier) {
      itemInPanier.quantity += 1;
    } else {
      items.push(item);
    }

    this.panier.next({ items });
    this._snackbar.open('1 item added to panier.', 'Ok', { duration: 3000 });
  }

  supprimerQuantite(item: PanierItem): void {
    let itemForRemoval: PanierItem | undefined;

    let filteredItems = this.panier.value.items.map((_item) => {
      if(_item.id === item.id) {
        _item.quantity--;

        if(_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.supprimerDuPanier(itemForRemoval, false);
    }

    this.panier.next({ items: filteredItems })

    this._snackbar.open('1 item remove from panier.', 'Ok', {
      duration: 3000
    })
  }

  getTotal(items: Array<PanierItem>): number {
    return items.
      map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearPanier(): void {
    this.panier.next({ items: [] });
    this._snackbar.open('Panier is cleared.', 'OK', {
      duration: 3000
    });
  }

  supprimerDuPanier(item: PanierItem, update = true): Array<PanierItem> {
    const filteredItems = this.panier.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if(update) {
      this.panier.next({ items: filteredItems });
      this._snackbar.open('1 item removed from panier.', 'Ok', {
        duration: 3000
      });
    }
    return filteredItems;
  }



}
