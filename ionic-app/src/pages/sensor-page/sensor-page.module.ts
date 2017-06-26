import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorPage } from './sensor-page';

@NgModule({
  declarations: [
    SensorPage,
  ],
  imports: [
    IonicPageModule.forChild(SensorPage),
  ],
  exports: [
    SensorPage
  ]
})
export class SensorPageModule {}
