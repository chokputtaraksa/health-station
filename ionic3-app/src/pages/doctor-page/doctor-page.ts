import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, PopoverController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Auth } from '../../providers/auth';
// import { Config } from '../../config'
import { LinkPage } from '../link-page/link-page'
import { LoginPage } from '../login-page/login-page'
import { SummaryPage } from '../summary-page/summary-page';
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

  constructor(public http : Http,public navCtrl: NavController,  
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public navParams : NavParams) {

      // console.log(this.navParams.get('res'));
  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      // console.log(res);
      // console.log("Already authorized");
      this.authService.getUserInfo().then(resp => {
        // console.log(resp);
        this.name = resp['thaiName'];
        this.uid = resp['uid'];
      });

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

  // getAllData(uid){
 
  //   return new Promise((resolve, reject) => {
 
  //       let headers = new Headers();
  //       // headers.append('Content-Type', 'application/json');
  //       headers.append('user_id', uid);
  //       // headers.append('authorization', 'Basic ' + new Buffer(credentials.email + ':' + credentials.password).toString('base64'));
  //       this.http.get(Config.AUTH_SERVER+'/api/data/latest',  {headers: headers})
  //         .subscribe(res => {
  //           // console.log(res);
  //           resolve(res.json());
  //         }, (err) => {
  //           reject(err);
  //         });
 
  //   });
 
  // }

  goProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  // ionbViewDidLoad(){
 
  //   this.todoService.getTodos().then((data) => {
  //         this.todos = data;
  //   }, (err) => {
  //       console.log("not allowed");
  //   });
 
  // }

  goSummaryPage(value){
    let data = {
      type : value,
      uid : this.uid
    }
    // console.log(value);
    this.navCtrl.push(SummaryPage, data);
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Not already authorized'
    });
 
    this.loading.present();
 
  }
}