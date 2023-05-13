import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html'
})
export class FiltresComponent implements OnInit, OnDestroy {
  @Output() showType = new EventEmitter<string>();
  typesSubscription: Subscription | undefined;
  types: Array<string> | undefined;
  constructor(private catalogueService: CatalogueService) { }



  ngOnInit():void {
    this.typesSubscription = this.catalogueService.getAllTypes()
    .subscribe((response) => {
      this.types = response;
      this.types = ['Vin Blanc', 'Vin rouge'];
    });
  }

  onShowType(type: string):void {
    this.showType.emit(type);
  }

  ngOnDestroy(): void {
      if(this.typesSubscription) {
        this.typesSubscription.unsubscribe();
      }
  }
}
