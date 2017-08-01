import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientListPage } from './patient-list-page';

@NgModule({
  declarations: [
    PatientListPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientListPage),
  ],
  exports: [
    PatientListPage
  ]
})
export class PatientListPageModule {}
