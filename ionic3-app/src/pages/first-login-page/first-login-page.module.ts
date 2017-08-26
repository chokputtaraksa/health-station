import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstLoginPage } from './first-login-page';

@NgModule({
  declarations: [
    FirstLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstLoginPage),
  ],
  exports: [
    FirstLoginPage
  ]
})
export class FirstLoginPageModule {}
