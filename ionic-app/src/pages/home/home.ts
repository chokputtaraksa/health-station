import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LinkPage } from '../link-page/link-page'
import { LoginPage } from '../login-page/login-page'
import { SummaryPage } from '../summary-page/summary-page';
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  todos: any;
  loading: any;
  name : string;
  birth_date : string;

  constructor(public navCtrl: NavController,  
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController) {
      this.name = "Rattapum Puttaraksa";
      this.birth_date = "10/12/37";
  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded
    // console.log("didload");
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            // console.log("Already authorized");
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

  // ionbViewDidLoad(){
 
  //   this.todoService.getTodos().then((data) => {
  //         this.todos = data;
  //   }, (err) => {
  //       console.log("not allowed");
  //   });
 
  // }

  goPage(value){
    let data = {
      type : value
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