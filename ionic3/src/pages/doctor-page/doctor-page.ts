import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, PopoverController, NavParams } from 'ionic-angular';
import { Http,/*Headers*/ } from '@angular/http';
import 'rxjs/add/operator/map';

import { Auth } from '../../providers/auth';
// import { Config } from '../../config'
import { LinkPage } from '../link-page/link-page'
import { LoginPage } from '../login-page/login-page'
import { SumWeekPage } from '../sum-week-page/sum-week-page';
import { ProfilePage } from '../profile-page/profile-page';

@Component({
  selector: 'doctor-page',
  templateUrl: 'doctor-page.html'
})
export class DoctorPage {
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
  segment1 : string = "noti";

  constructor(public http : Http,public navCtrl: NavController,  
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public navParams : NavParams) {
      this.name = this.authService.profile['thaiFullName']
      this.uid = this.authService.profile['_id'];
      // console.log(this.navParams.get('res'));
  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {

    }, (err) => {
      console.log("Not already authorized");
      this.navCtrl.setRoot(LoginPage);
    });
  }    
  
  showMenu(myEvent){
    let popover = this.popoverCtrl.create(LinkPage);
    popover.present({
      ev: myEvent
    });
  }

  goProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goSummaryPage(value){
    let data = {
      type : value,
      uid : this.uid
    }
    // console.log(value);
    this.navCtrl.push(SumWeekPage, data);
  }

  // goPatientInfo(){
  //     this.navCtrl.push(PatientListPage);
  // }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Not already authorized'
    });
 
    this.loading.present();
 
  }
}