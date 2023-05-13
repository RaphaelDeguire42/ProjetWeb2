import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cellier } from 'src/app/models/models';
import { CellierService } from 'src/app/services/cellier.service';

const ROWS_HEIGHT: { [id:number]: number} = {1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-cellier',
  templateUrl: './cellier.component.html'
})
export class CellierComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  type: string | undefined;
  celliers: Array<Cellier> | undefined;
  sort = 'desc';
  count = '12';
  cellierSubscription: Subscription | undefined;

  constructor(private cellierService: CellierService) {}

  ngOnInit(): void {
      this.getCelliers();
  }

  getCelliers(): void {
    this.cellierSubscription = this.cellierService.getCelliersUtilisateur()
      .subscribe((_celliers)=>{
        this.celliers = _celliers;

      })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowType(newType:string):void {
    this.type = newType;
    this.getCelliers();
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
    this.getCelliers();
  }

  onSortChange(newSort: string):void {
    this.sort = newSort;
    this.getCelliers();
  }

  ngOnDestroy(): void {
      if(this.cellierSubscription) {
        this.cellierSubscription.unsubscribe();
      }
  }
}
