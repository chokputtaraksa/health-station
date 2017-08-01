import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController} from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { DataService } from '../../providers/data';
import { ChartService } from '../../providers/chart'

import { LoginPage } from '../login-page/login-page';


/**
 * Generated class for the SummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'sum-week-page',
  templateUrl: 'sum-week-page.html',
  providers: [DataService,]
})
export class SumWeekPage {

    @ViewChild('lineCanvas') lineCanvas;
    uid : string;
    name : string;
    chart: any;
    title : string;
    period : string;
    mode : string;
    description : any;
    todayData : any;
    date_string : string;
    whichTime_str : string;
    whichTime : Date;
    chartService : ChartService = new ChartService();

 
    constructor(public navCtrl: NavController, public navParams : NavParams, 
        public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
        public popoverCtrl: PopoverController, public dataService:DataService) {
        this.title = this.navParams.get('type');
        this.mode = "today"
        this.whichTime = new Date();
        this.name = this.authService.profile['thaiFullName']
        this.uid = this.authService.profile['_id'];
        this.whichTime_str = "week4";
        this.description = this.getDescription(this.title);
    }

    ionViewCanEnter(){
        this.authService.checkAuthentication().then((res) => {

        }, (err) => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

    ionViewDidLoad() {
      this.dataService.getLatestDataByType(this.uid, this.navParams.get('type')).then(response=>{
        this.todayData = response;
        this.date_string = this.isTheSameDate(response['effective_time_frame']['date_time']);
      },err=>{

      });
      this.dataService.getDataByPeriod(this.uid, "week", this.title).then((resp)=>{
        this.chart = this.returnChart(resp,this.title, this.whichTime, this.lineCanvas);
      },err=>{
        this.chart = this.returnChart(err, this.title, this.whichTime, this.lineCanvas);
      });
    }

    returnChart(resp, type, whichTime,lineCanvas){
      this.prepareDataForChart(resp, type, whichTime).then(result=>{ // look at prepareDataForChart
        return this.chartService.createChart(result,type, lineCanvas);
      },err=>{
        return this.chartService.createChart(err,type, lineCanvas); // make zero chart
      });
    }

    
    prepareDataForChart(resp, type, whichTime){
        var data_l = [];
        var data_h = [];
        var label = ["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat",];
        return new Promise((resolve,reject)=>{
            var start = new Date(whichTime);
            start.setDate(start.getDate()-start.getDay());
            start.setHours(0);
            start.setMinutes(0);
            var end = new Date(whichTime);
            end.setDate(end.getDate()+ (6-end.getDay()));
            end.setHours(0);
            end.setMinutes(0);
            this.arrangeData(resp, type).then(result=>{
                for(var i=start.getDay(); i<=end.getDay(); i++){
                    for(var j=1; j<=Object.keys(result).length; j++){
                        if(result[j-1].date.getDate() == i){
                            if(type == "Bloodpressure"){
                                data_l[i] = result[j-1].value_l;
                                data_h[i] = result[j-1].value_h;
                            }else{
                                data_l[i] = result[j-1].value;
                            }
                        }// can not use else here I don't know why but 0 will replace the real value
                    } // so I use a new for loop to check if empty put 0 there
                }
                for(var k=start.getDay(); k<=end.getDay(); k++){
                    if(type == "Bloodpressure"){
                        if(!data_l[k]){
                            data_l[k]=0;
                        }
                        if(!data_h[k]){
                            data_h[k]=0;
                        }
                    }else{
                        if(!data_l[k]){
                            data_l[k]=0;
                        }
                        if(!data_h[k]){
                            data_h[k]=null;
                        }
                    }
                }
                resolve({data_l: data_l, data_h: data_h,label:label});
            },err=>{
                for(var i=start.getDay(); i<=end.getDay(); i++){
                    if(!data_l[i]){
                        data_l[i]=0;
                    }
                    if(!data_h[i]){
                        data_h[i]=null;
                    }
                }
                reject({data_l: data_l, data_h: data_h, label:label});
            });
        });
    }

    arrangeData(resp, title){
        return new Promise((resolve, reject) => {
            try{
                var datas = [];
                let type : string;
                if(title=="Heartrate"){
                    type = "heart_rate";
                }else if(title=="Bloodpressure"){
                    type = "_blood_pressure";
                }else if(title=="Temperature"){
                    type = "body_temperature";
                }else if(title=="Weight"){
                    type = "body_weight";
                }else if(title=="Height"){
                    type = "body_height";
                }
                for(var index in resp){
                    if(title =="Bloodpressure"){
                        datas.push({
                            date:new Date(resp[index]['effective_time_frame'].date_time), 
                            value_l:resp[index]['systolic'+ type].value,
                            value_h:resp[index]['diastolic'+ type].value,
                            unit : resp[index]['systolic'+type].unit
                        });
                    }else{
                        datas.push({
                            date:new Date(resp[index]['effective_time_frame'].date_time), 
                            value: resp[index][type].value,
                            unit : resp[index][type].unit
                        });
                    }
                }
                resolve(datas);
            }catch(exc){
                reject(exc)
            }
        });
    }

    getDateInMonth(date){ // to get number of date in the month
      return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }

    getDescription(type){
        var desc =[];
        if(type==="Heartrate"){
            desc['title'] = "อัตราการเต้นของหัวใจ คืออะไร";
            desc['t_desc'] = "อัตราการเต้นของหัวใจ คือ ความเร็วในการบีบตัวของหัวใจในช่วงระยะเวลาหนึ่งๆ โดยทั่วไปนิยมใช้หน่วย \"ครั้งต่อนาที(BPM)\"";
        }else if(type==="Bloodpressure"){
            desc['title'] = "ความดันโลหิต คืออะไร";
            desc['t_desc'] = "asd";
        }else if(type==="Weight"){
            desc['title'] = "น้ำหนัก คืออะไร";
            desc['t_desc'] = "asdsad";
        }else if(type==="Height"){
            desc['title'] = "ความสูง คืออะไร";
            desc['t_desc'] = "asdasd";
        }else if(type==="Temperature"){
            desc['title'] = "อุณหภูมิร่างกาย คืออะไร";
            desc['t_desc'] = "dasdas";
        }
        return desc;
    }

    isTheSameDate(input){
        var now = new Date();

        var data_date = new Date(input);

        let date : string;
        if(now.toDateString() === data_date.toDateString()){
            date = "Today, " + data_date.toISOString().substr(11,8);
        }else{
            date = this.getFormalYMD(data_date);
        }
        return date;
    }

    getFormalYMD(input : Date){
        var str = input.toISOString();
        return str.substr(8,2)+"/"+str.substr(5,2)+ "/" + (parseInt(str.substr(0,4))+543);
    }
}
