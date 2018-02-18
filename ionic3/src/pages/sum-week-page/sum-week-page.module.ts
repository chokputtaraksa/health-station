import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SumWeekPage } from './sum-week-page';

@NgModule({
  declarations: [
    SumWeekPage,
  ],
  imports: [
    IonicPageModule.forChild(SumWeekPage),
  ],
  exports: [
    SumWeekPage
  ]
})
export class SumWeekPageModule {}
