import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

/**
 * Generated class for the LinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-link-page',
  templateUrl: 'link-page.html',
})
export class LinkPage {
  pages: Array<{title: string, component: any}>;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public authService: Auth) {
    this.pages = [
      // { title: 'Dashboard', component: HomePage },
      // { title: 'Setting', component: HistoryPage },
      { title: 'Logout', component: LoginPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title === 'Logout'){
      this.authService.logout();
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(page.component);
    }else{
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(page.component);
    }
  }

}
