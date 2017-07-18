import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth'
import { LoginPage } from '../login-page/login-page'

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  thai_name : string;
  eng_name : string;
  birth_date : string;
  gender : string;
  address : string;
  yearsold : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : Auth) {

  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded
    // console.log("didload");
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
          // console.log(res);
            // console.log("Already authorized");
            this.authService.getUserInfo().then(res => {
              this.thai_name = res['thaiName'];
              this.eng_name = res['engName'];
              this.birth_date = res['birthdate'];
              this.gender = res['gender'];
              this.address = res['address']
              this.yearsold = (this.calYearsOld(res['birthdate']));
              // console.log(data['email']);
              // this.user_info.email = data['email'];
            });
        }, (err) => {
            console.log("Not already authorized");
            this.navCtrl.setRoot(LoginPage);
        });
 
    }    

    calYearsOld(birth_date){
      let dateSplit = birth_date.split("/");
      let today = new Date();
      let profileDate = new Date(dateSplit[2]-543, dateSplit[1]-1, dateSplit[0]);
      var age = today.getFullYear() - profileDate.getFullYear();
      var m = today.getMonth() - profileDate.getMonth();
      var d = today.getDate() - profileDate.getDate();
      if (m < 0 || (m === 0 && today.getDate() < profileDate.getDate())) {
        age--;
        m +=12;
      }
      if (d < 0){
        m--;
        d += this.getDateInMonth(today.getFullYear(), today.getMonth())+d;
      }
      return age + " ปี " + m + " เดือน " + d + " วัน";
    }

    getDateInMonth(year ,month){
      return new Date(year, month, 0).getDate();
    }

}
