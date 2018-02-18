import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { LinkPage } from '../pages/link-page/link-page';
import { SumWeekPage } from '../pages/sum-week-page/sum-week-page';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { DoctorPage } from '../pages/doctor-page/doctor-page';
import { TabsPage } from '../pages/tabs/tabs';
import { FirstLoginPage } from '../pages/first-login-page/first-login-page'
import { BodyMeasurePage } from '../pages/body-measure-page/body-measure-page'
import { HealthRecordPage } from '../pages/health-record/health-record'

import { Auth } from '../providers/auth';

import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LinkPage,
    ProfilePage,
    DoctorPage,
    SumWeekPage,
    FirstLoginPage,
    BodyMeasurePage,
    TabsPage,
    HealthRecordPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LinkPage,
    SumWeekPage,
    ProfilePage,
    DoctorPage,
    FirstLoginPage,
    BodyMeasurePage,
    TabsPage,
    HealthRecordPage,
  ],
  providers: [
    Auth,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}