import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
// import { TabsPage } from '../tabs/tabs';

import { AlertController } from 'ionic-angular';
@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
    idNumber: string;
    loading: any;
    alert : string;
 
    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    }
 
    ionViewDidLoad() { //will trigger as soon as the page is loaded
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }    

    login(){
 
        this.showLoader();
        // if(this.validateEmail(this.email)){
            let credentials = {
                idNumber: this.idNumber,
            };
            // console.log(credentials);
            if(!credentials.idNumber){
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: "Undefined",
                    subTitle: 'Undefined id number',
                    buttons: ['Dismiss']
                });
                alert.present();
            }else{
                this.authService.login(credentials).then((result) => {
                    this.loading.dismiss();
                    // console.log(result);
                    // if(result['user']['role'] ==='doctor'){ // if you are doctor u will redirect to doctor page
                    //     this.navCtrl.setRoot(Doctor1stPage);
                    // }else if(result['user']['role'] ==='relative'){ // if not redirect to relative page
                    //     this.navCtrl.setRoot(HomePage);
                    // }else if(result['user']['role'] ==='patient'){
                    this.navCtrl.setRoot(HomePage);
                    // }
                }, (err) => {
                    this.loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: err.statusText,
                        subTitle: 'Invalid id number',
                        buttons: ['Dismiss']
                    });
                    alert.present();
                    // console.log(err);
                });
            }
        // }else{
        //     this.loading.dismiss();
        //     let alert = this.alertCtrl.create({
        //         title: "Undefined",
        //         subTitle: 'Invalid email',
        //         buttons: ['Dismiss']
        //     });
        //     alert.present();
        // }
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

    // validateEmail(email) {
    //     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(email);
    // }
 
}