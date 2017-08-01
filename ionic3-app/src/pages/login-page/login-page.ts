import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { DoctorPage } from '../doctor-page/doctor-page'
// import { TabsPage } from '../tabs/tabs';

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
            this.loading.dismiss();
            var result = JSON.parse(res['_body']);
            if(result['role'] ==="doctor"){
                this.navCtrl.setRoot(DoctorPage);
            }else if(result['role'] ==="patient"){
                this.navCtrl.setRoot(HomePage);
            }
        }, (err) => {
            this.loading.dismiss();
        });
 
    }    

    login(){
        // this.showLoader();
        let credentials = {
            idNumber: this.idNumber,
        };
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
                if(result['user']['role'] ==='doctor'){ // if you are doctor u will redirect to doctor page
                    this.navCtrl.setRoot(DoctorPage);
                // }else if(result['user']['role'] ==='relative'){ // if not redirect to relative page
                //     this.navCtrl.setRoot(HomePage);
                }else if(result['user']['role'] ==='patient'){
                    this.navCtrl.setRoot(HomePage);
                }
            }, (err) => {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: err.statusText,
                    subTitle: 'Invalid id number',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
        }
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