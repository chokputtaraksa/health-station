import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodyMeasurePage } from './body-measure-page';

@NgModule({
  declarations: [
    BodyMeasurePage,
  ],
  imports: [
    IonicPageModule.forChild(BodyMeasurePage),
  ],
  exports: [
    BodyMeasurePage
  ]
})
export class BodyMeasurePageModule {}
