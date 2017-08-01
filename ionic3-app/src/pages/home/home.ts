import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, PopoverController, NavParams, } from 'ionic-angular';
import { Http, /*Headers*/ } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Auth } from '../../providers/auth';
// import { Config } from '../../config'

import { TabsPage } from '../tabs/tabs'
import { LinkPage } from '../link-page/link-page'
import { LoginPage } from '../login-page/login-page'
import { SumWeekPage } from '../sum-week-page/sum-week-page';
import { ProfilePage } from '../profile-page/profile-page';
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
})
export class HomePage {
  loading: any;
  uid : string;
  name : string;
  birth_date : string;
  heartrate : number;
  hr_unit : string;
  weight : number;
  w_unit : string;
  height : number;
  h_unit : string;
  bp_h : number;
  bp_l : number;
  bp_unit : string;
  temperature : number;
  t_unit : string;

  constructor(public http : Http,public navCtrl: NavController,public alertCtrl: AlertController, 
    public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, 
    public navParams : NavParams, public storage : Storage) {

      this.name = this.authService.profile['thaiFullName']
      this.uid = this.authService.profile['_id'];
  }

  ionViewCanEnter() {  //will trigger as soon as the page is loaded
                      //Check if already authenticate
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }    
  
  showMenu(myEvent){
    let popover = this.popoverCtrl.create(LinkPage);
    popover.present({
      ev: myEvent
    });
  }

  goSummaryPage(value){
    let data = {
      type : value,
      uid : this.uid
    }
    // console.log(value);
    this.navCtrl.push(TabsPage, data);
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authorization'
    });
 
    this.loading.present();
 
  }
  goProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

}