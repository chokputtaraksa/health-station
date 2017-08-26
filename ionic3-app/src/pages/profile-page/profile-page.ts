import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import { Auth } from '../../providers/auth'
import { UserController } from '../../providers/user'
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
  providers: [UserController,]
})
export class ProfilePage {
  thai_name : string;
  eng_name : string;
  role : string;
  address : string;
  address_allow : boolean;
  editable : boolean = false;
  expect_about_data : Array<{}>;
  expect_patient_data : Array<{}>;
  address2 : string= "ไม่ได้ตั้งค่า";
  address2_allow : boolean;
  profile_list : Array<{thai_title:string, eng_title:string,value:string}>;
  profile_list_editable : Array<{id:string,thai_title:string, eng_title:string, value:string}>
  provider_list : Array<{pid:string, thai_name:string,eng_name:string, allow:boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl: AlertController, public authService : Auth, 
              public actionSheetCtrl:ActionSheetController, public userCtrl: UserController) {
    this.expect_about_data = ["phone", "email"];
    this.expect_patient_data = ["bloodtype", "disease","drugallergy"];
    this.getPatientData();
  }

  ionViewDidLoad() { //will trigger as soon as the page is loaded 
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {

    }, (err) => {
        this.navCtrl.setRoot(LoginPage);
    });

  }

  getPatientData(){
    this.thai_name = this.authService.profile['thaiFullName'];
    this.eng_name = this.authService.profile['engFullName'];
    var address_obj = this.authService.profile['address'];
    this.address = address_obj['title'];
    this.address_allow = address_obj['allow']
    this.role = this.authService.profile['role'];
    this.profile_list = [
      {thai_title:"วันเกิด",eng_title:"Birthdate" ,value: this.showBirthDate(this.authService.profile['birthOfDate'])},
      {thai_title:"อายุ",eng_title:"Age" , value:this.calYearsOld(this.authService.profile['birthOfDate'])},
      {thai_title:"เพศ", eng_title:"Gender" , value:this.authService.profile['gender']},
    ];
    var about = this.authService.profile['about'];
    var about_patient = this.authService.profile['about_patient'];
    var allAbout = this.isAboutExisted(about, about_patient);
    this.profile_list_editable=[
      {id:"bloodtype" ,thai_title:"กรุ๊ปเลือด",eng_title:"Bloodtype", value: allAbout['bloodtype']},
      {id:"disease" ,thai_title:"โรคประจำตัว", eng_title:"Congenital disease", value: allAbout['disease']},
      {id:"drugallergy" ,thai_title:"แพ้ยา", eng_title:"Drug allergic", value: allAbout['drugallergy']},
      {id:"phone" ,thai_title:"เบอร์โทรศัพท์", eng_title:"Phone", value: allAbout['phone']},
      {id:"email" ,thai_title:"อีเมล", eng_title:"Email", value: allAbout['email']},
    ];
    this.provider_list = [
      {pid:"123sdnfoaib",thai_name:"ลาดกระบัง1", eng_name:"KMITL", allow:true},
      {pid:"123sadasd",thai_name:"ลาดกระบัง2",eng_name:"KMITL_2", allow:false},
    ];
  }

  isAboutExisted(about, about_patient):object{
    let allAbout = {};
    let expect_about = this.expect_about_data;
    let expect_about_patient = this.expect_patient_data;
    for(let index in expect_about){
      let key  = expect_about[index]+"";
      if(about[key]){
        allAbout[key] = about[key];
      }else {
        allAbout[key] = "ไม่ได้ตั้งค่า";
      }
    }
    for(let index in expect_about_patient){
      let key  = expect_about_patient[index]+"";
      if(about_patient[key]){
        allAbout[key] = about_patient[key];
      }else {
        allAbout[key] = "ไม่ได้ตั้งค่า";
      }
    }
    if(about['address2']){
      var address2_obj = about['address2']
      if(address2_obj['title']){
        this.address2 = address2_obj['title'];
      }
      this.address2_allow = address2_obj['allow'];
    }
    return allAbout;
  }

  save(){
      this.editable = false;
      var content = this.changingAbout(); // change about
      var address2 = this.changingAddress2(); // change address2
      if(Object.keys(address2).length > 0){
        content['address2'] = address2;
      }
      if(this.address_allow != this.authService.profile['address']['allow']){
        this.authService.profile['address']['allow'] = this.address_allow;
        content['address_allow'] = this.address_allow;
      }
      
      this.userCtrl.saveProfile(this.authService.profile, content);
  }

  changingAddress2(){
    var address2_obj = this.authService.profile['about']['address2']; //for local storage
    let address2 = {};
    if(!this.address2 || this.address2==""){ // address2 changing
      this.address2 = "ไม่ได้ตั้งค่า";
    }
    if(this.address2!=address2_obj['title']){
      address2_obj['title'] = this.address2; // change value in local storage
      address2['title'] = this.address2;  // DB
    }
    if(this.address2_allow != address2_obj['allow']){
      address2_obj['allow'] = this.address2_allow;
      address2['allow'] = this.address2_allow;
    }
    return address2;
  }

  changingAbout(){
    let about:object = [];
    let about_editable_list = this.expect_about_data;
    let about_patient_editable_list = this.expect_patient_data;
    for(var index in this.profile_list_editable){
      var changing_list = this.profile_list_editable[index];
      if(!changing_list.value || changing_list.value==""){                  // so we need to change it title as well
        this.profile_list_editable[index].value="ไม่ได้ตั้งค่า";
        this.authService.profile['about'][changing_list.id]="ไม่ได้ตั้งค่า";
      }
      if(about_editable_list.indexOf(changing_list.id) > -1){
        if(changing_list.value!="ไม่ได้ตั้งค่า" && changing_list.value!=this.authService.profile['about'][changing_list.id]){
          this.authService.profile['about'][changing_list.id] = changing_list.value;
          about[changing_list.id] = changing_list.value;
        }
      }
      if(about_patient_editable_list.indexOf(changing_list.id) > -1){
        if(changing_list.value!="ไม่ได้ตั้งค่า" && changing_list.value!=this.authService.profile['about_patient'][changing_list.id]){
          this.authService.profile['about_patient'][changing_list.id] = changing_list.value;
          about[changing_list.id] = changing_list.value;
        }
      }
    }
    return about;
  }

  changingProvider(){
    // var address2_obj = this.authService.profile['about']['address2']; //for local storage
    // var address2 = [];
    // if(!this.address2 || this.address2==""){ // address2 changing
    //   this.address2 = "ไม่ได้ตั้งค่า";
    //   address2_obj = "ไม่ได้ตั้งค่า";
    // }else if(this.address2!="ไม่ได้ตั้งค่า" && this.address2!=address2_obj['title']){
    //   address2_obj['title'] = this.address2; // change value in local storage
    //   address2['title'] = this.address2;  // DB
    // }
    // if(this.address2_allow != address2_obj['allow']){
    //   address2_obj['allow'] = this.address2_allow;
    //   address2['allow'] = this.address2_allow;
    // }
    // return address2;
  }

  changePassword(){

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

              }
            },
          ]
      });
      alert.present();
    }else{

    }
  }

  calYearsOld(birth_date){
    let dateSplit = birth_date.split("/");
    let today = new Date();
    let profileDate = new Date(dateSplit[2], dateSplit[0]-1, dateSplit[1]);
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

  fullAddress(addressList){
    let alert = this.alertCtrl.create({
      title: 'ที่อยู่ที่ติดต่อได้',
      subTitle: addressList,
      buttons: ['OK']
    });
    alert.present();
  }

  showBirthDate(birth_date){
    let dateSplit = birth_date.split("/");
    return dateSplit[1]+"/"+dateSplit[0]+"/"+(parseInt(dateSplit[2])+543);
  }

  edit(){
    this.editable = true;
  }

  cancel(){
    this.editable = false;
  }
}

