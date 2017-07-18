import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { SensorPage } from '../pages/sensor-page/sensor-page';
import { HistoryPage } from '../pages/history-page/history-page';
import { LinkPage } from '../pages/link-page/link-page';
import { SummaryPage } from '../pages/summary-page/summary-page';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { DoctorPage } from '../pages/doctor-page/doctor-page';
// import { TabsPage } from '../pages/tabs/tabs';

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
    SignupPage,
    SensorPage,
    HistoryPage,
    LinkPage,
    SummaryPage,
    ProfilePage,
    DoctorPage
    // TabsPage
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
    SignupPage,
    SensorPage,
    HistoryPage,
    LinkPage,
    SummaryPage,
    ProfilePage,
    DoctorPage
    // TabsPage
  ],
  providers: [
    Auth,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}