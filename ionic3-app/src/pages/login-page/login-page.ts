import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';
import { DoctorPage } from '../doctor-page/doctor-page'
import { FirstLoginPage } from '../first-login-page/first-login-page'
// import { TabsPage } from '../tabs/tabs';
import { ProfilePage } from '../profile-page/profile-page';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
    username: string;
    password: string;
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
            if(result['firsttime']){
                this.navCtrl.setRoot(FirstLoginPage);
            }else if(result['role'] ==="doctor"){
                this.navCtrl.setRoot(DoctorPage);
            }else if(result['role'] ==="patient"){
                this.navCtrl.setRoot(HomePage);
                // this.navCtrl.setRoot(ProfilePage);
            }
        }, (err) => {
            this.loading.dismiss();
        });
 
    }    

    login(){
        this.showLoader();
        let credentials = {
            username: this.username,
            password: this.password
        };
        if(!credentials.username || !credentials.password){
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
                title: "Undefined",
                subTitle: 'Missing username or password',
                buttons: ['Dismiss']
            });
            alert.present();
        }else{
            this.authService.login(credentials).then((result) => {
                this.loading.dismiss();
                this.authService.saveUsernamePassword(this.username, this.password);
                if(result['user']['firsttime']){
                    this.navCtrl.setRoot(FirstLoginPage);
                }else if(result['user']['role'] ==='doctor'){ // if you are doctor u will redirect to doctor page
                    this.navCtrl.setRoot(DoctorPage);
                // }else if(result['user']['role'] ==='relative'){ // if not redirect to relative page
                //     this.navCtrl.setRoot(HomePage);
                }else if(result['user']['role'] ==='patient'){
                    this.navCtrl.setRoot(HomePage);
                    // this.navCtrl.setRoot(ProfilePage);
                }
            }, (err) => {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: err.statusText,
                    subTitle: 'Invalid username or password',
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