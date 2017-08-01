import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  selector: 'profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  thai_name : string;
  eng_name : string;
  birth_date : string;
  gender : string;
  address : string;
  yearsold : string;
  role : string;
  bloodtype : string = "-";
  disease : string = "-";
  drugallergy : string = "-";
  editable : boolean = false;
  showAgreement : boolean = false;
  phone : string = "-";
  email : string = "-";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService : Auth) {
    this.thai_name = this.authService.profile['thaiFullName'];
    this.eng_name = this.authService.profile['engFullName'];
    this.birth_date = this.authService.profile['birthOfDate'];
    this.gender = this.authService.profile['gender'];
    this.address = this.authService.profile['address'];
    this.role = this.authService.profile['role'];
    this.yearsold = (this.calYearsOld(this.birth_date));
  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded
    // console.log("didload");
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
          console.log(this.authService.profile)
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
      }
      return age + " ปี " + m + " เดือน";
    }

    getDateInMonth(year ,month){
      return new Date(year, month, 0).getDate();
    }

    edit(){
      this.editable = true;
    }

    showDoctorAgreement(){
      this.showAgreement = !this.showAgreement;
    }

    agreeToggle(event){

      if(event.checked){
        let alert = this.alertCtrl.create({
            title: "Warnning",
            subTitle: 'การอนุญาติให้บุคคลภายนอกสามารถเข้าถึงข้อมูลมีความเสี่ยงต่อการรั่วไหลของข้อมูล \
                      กรุณาตรวจเช็คบุคคลที่ขออนุญาติให้ละเอียด ทางผู้จัดทำไม่รับผิดชอบหากเกิดการรั่วไหลของข้อมูลเนื่องจากบุคคลที่ได้รับอนุญาติ',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  event.checked = false;
                }
              },{
                text: 'Accept',
                handler: () => {
                  console.log('Accept clicked');
                }
              },
            ]
        });
        alert.present();
      }else{

      }
    }

    save(){
      this.editable = false;
      var profile = {
        _id : this.authService.profile['_id'],
        bloodtype : this.bloodtype,
        disease : this.disease,
        drugallergy : this.drugallergy
      }
      this.authService.saveProfile(profile);
    }

    cancel(){
      // this.bloodtype = 
      this.editable = false;
    }


}
