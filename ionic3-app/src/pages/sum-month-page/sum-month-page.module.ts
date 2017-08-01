import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SumMonthPage } from './sum-month-page';

@NgModule({
  declarations: [
    SumMonthPage,
  ],
  imports: [
    IonicPageModule.forChild(SumMonthPage),
  ],
  exports: [
    SumMonthPage
  ]
})
export class SumMonthPageModule {}
