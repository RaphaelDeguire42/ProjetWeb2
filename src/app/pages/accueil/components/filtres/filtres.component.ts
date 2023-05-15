import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeBouteille } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html'
})
export class FiltresComponent implements OnInit, OnDestroy {
  @Output() showType = new EventEmitter<string>();
  typesSubscription: Subscription | undefined;
  types: Array<TypeBouteille> | undefined;
  constructor(private catalogueService: CatalogueService) { }



  ngOnInit():void {
    this.typesSubscription = this.catalogueService.getTypes()
    .subscribe((response) => {
      this.types = response;
    });
  }

  onVoirType(type: TypeBouteille):void {
    this.showType.emit(type.type);
  }

  ngOnDestroy(): void {
      if(this.typesSubscription) {
        this.typesSubscription.unsubscribe();
      }
  }
}
