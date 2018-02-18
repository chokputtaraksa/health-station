import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { LoginPage } from '../login-page/login-page';
/**
 * Generated class for the FirstLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-first-login-page',
  templateUrl: 'first-login-page.html',
})
export class FirstLoginPage {
  username:string = "";
  pass:string = "";
  pass2:string = "";
  loading:any;
  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {

    }, (err) => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  changeUsernamePass(){
    this.showLoader("Changing username and password");
    if(this.checkUsername(this.username)){
      if(this.checkPassword(this.pass, this.pass2)){
        var authen = {
          username : this.username,
          password : this.pass
        }
        this.authService.firsttime_change(authen).then((result) => {
          this.authService.logout();
          this.loading.dismiss();
          this.navCtrl.setRoot(LoginPage);
        }, (err) => {
          console.log(err);
        });
      }
    }
  }

  checkUsername(username){
    var re = /^[0-9A-Za-z_]+$/;
    if(username.length < 6){
      var content = {
        detail : "ชื่อผู้ใช้งานควรมีความยาวมากกว่า 6 ตัว",
      }
      this.showAlert(content);
      return false;
    }else{
      if(re.test(username)){
        return true;
      }else{
        var content = {
          detail : "ชื่อผู้ใช้งานควรเป็นภาษาอังกฤษและตัวเลข",
        }
        this.showAlert(content);
        return false; 
      }
    }
  }
  checkPassword(password1, password2){
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if(password1.length<8){ 
      var content = {
        detail : "พาสเวิร์ดควรมีความยาวมากกว่า 8 ตัว",
      }
      this.showAlert(content);
      return false;
    }else{
      if(password1===password2){
        if(re.test(password1)){
          return true;
        }else{
          var content = {
            detail : "พาสเวิร์ดควรเป็นภาษาอังกฤษและประกอบไปด้วยตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข",
          }
          this.showAlert(content);
          return false; 
        }
      }else{
        var content = {
          detail : "พาสเวิร์ดทั้งสองตัวไม่เหมือนกัน"
        }
        this.showAlert(content);
        return false;
      }
    }
  }
  showLoader(content){
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  showAlert(content){
    let alert = this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด',
      subTitle: content.detail,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}

