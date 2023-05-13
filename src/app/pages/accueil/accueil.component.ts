import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bouteille } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';

const ROWS_HEIGHT: { [id:number]: number} = {1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  type: string | undefined;
  bouteilles: Array<Bouteille> | undefined;
  sort = 'desc';
  count = '12';
  bouteilleSubscription: Subscription | undefined;

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit(): void {
      this.getBouteilles();
  }

  getBouteilles(): void {
    this.bouteilleSubscription = this.catalogueService.getAllBouteilles(this.count, this.sort, this.type)
      .subscribe((_bouteilles)=>{
        this.bouteilles = _bouteilles;
      })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowType(newType:string):void {
    this.type = newType;
    this.getBouteilles();
  }

  onAddToCart(product: any):void {
    /*
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
    */
  }

  onItemsCountChange(newCount: number):void {
    this.count = newCount.toString();
    this.getBouteilles();
  }

  onSortChange(newSort: string):void {
    this.sort = newSort;
    this.getBouteilles();
  }

  ngOnDestroy(): void {
      if(this.bouteilleSubscription) {
        this.bouteilleSubscription.unsubscribe();
      }
  }
}
