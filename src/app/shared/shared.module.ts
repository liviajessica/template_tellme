import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { AgmCoreModule } from '@agm/core'
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.mapsAPIKey}`
    })
  ],
  exports: [
    LocationPickerComponent,
    MapModalComponent
  ],
  entryComponents: [MapModalComponent]
})
export class SharedModule { }
