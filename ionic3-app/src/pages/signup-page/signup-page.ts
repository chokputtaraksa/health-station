import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login-page/login-page'
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  loading:any;
  alert : string;
 
  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }
 
  register(){
 
    this.showLoader();
    if(this.validateEmail(this.email)){
      let details = {
          email: this.email,
          password: this.password,
          profile : {
            role: this.role
            // blah blah blah
          }
      };

      if(!details.email){
        this.loading.dismiss();
        this.alert = "Please enter your email.";
      }else if(!details.password){
        this.loading.dismiss();
        this.alert = "Please enter your password."
      }else{
        this.authService.createAccount(details).then((result) => {
          this.loading.dismiss();
          console.log(result);
          this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
              title: "Sorry!",
              subTitle: 'This email is already active.',
              buttons: ['Dismiss']
            });
            alert.present();
        });
      }
    }else{
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: "Undefined",
        subTitle: 'Invalid email',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  isValidate(){
    
  }

  cancel(){
    this.showLoader2();
    this.loading.dismiss();
    this.navCtrl.setRoot(LoginPage);
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }

  showLoader2(){
 
    this.loading = this.loadingCtrl.create({
      content: 'waiting...'
    });
 
    this.loading.present();
 
  }
  validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
 
}