import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Format, Pays, TypeBouteille } from 'src/app/models/models';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html'
})
export class FiltresComponent implements OnInit, OnDestroy {
  @Output() showType = new EventEmitter<number>();
  @Output() showFormat = new EventEmitter<number>();
  @Output() showPays = new EventEmitter<number>();
  typesSubscription: Subscription | undefined;
  formatsSubscription: Subscription | undefined;
  paysSubscription: Subscription | undefined;
  types: Array<TypeBouteille> | undefined;
  formats: Array<Format> | undefined;
  pays: Array<Pays> | undefined;
  constructor(private catalogueService: CatalogueService) { }



  ngOnInit():void {
    this.typesSubscription = this.catalogueService.getTypes()
    .subscribe((response) => {
      this.types = response;
    });
    this.formatsSubscription = this.catalogueService.getFormats()
    .subscribe((response) => {
      this.formats = response;
    });
    this.paysSubscription = this.catalogueService.getPays()
    .subscribe((response) => {
      this.pays = response;
    });
  }

  onVoirType(type_id: number):void {
    this.showType.emit(type_id);
  }
  onVoirFormat(format_id: number):void {
    this.showFormat.emit(format_id);
  }
  onVoirPays(pays_id: number):void {
    this.showPays.emit(pays_id);
  }

  ngOnDestroy(): void {
      if(this.typesSubscription) {
        this.typesSubscription.unsubscribe();
      }
      if(this.formatsSubscription) {
        this.formatsSubscription.unsubscribe();
      }
      if(this.paysSubscription) {
        this.paysSubscription.unsubscribe();
      }
  }
}
