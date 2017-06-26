import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkPage } from './link-page';

@NgModule({
  declarations: [
    LinkPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkPage),
  ],
  exports: [
    LinkPage
  ]
})
export class LinkPageModule {}
