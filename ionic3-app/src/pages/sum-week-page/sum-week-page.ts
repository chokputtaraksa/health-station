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

    @ViewChild('weekChart') weekChart;
    @ViewChild('monthChart') monthChart;
    uid : string;
    name : string;
    title : string;
    period : string;
    mode : string;
    description : any;
    todayData : any;
    date_string : string;
    chartService : ChartService = new ChartService();
    selection_list : Array<{value:string, name:string}>;

 
    constructor(public navCtrl: NavController, public navParams : NavParams, 
        public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
        public popoverCtrl: PopoverController, public dataService:DataService) {
        this.title = this.navParams.get('type');

        this.mode = "today"
        this.name = this.authService.profile['thaiFullName']
        this.uid = this.authService.profile['_id'];
        this.description = this.getDescription(this.title);
        this.period = "week"
        this.selection_list = [
            {value : "week", name : "Week"},
            {value : "month", name : "Month"},
            {value : "year", name : "Year"}
        ]
    }

    changePeriod(event){
        if(event._value === "week"){
            if(!this.weekChart['nativeElement']._chartjs){
                this.dataService.getDataByPeriod(this.uid, event._value, this.title).then((resp)=>{
                    this.chartService.getChart(resp, event._value, this.title, new Date(), this.weekChart);
                },err=>{
                    this.chartService.getChart(err, event._value, this.title, new Date(), this.weekChart);
                });
            }
        }else if(event._value ==="month"){
            if(!this.monthChart['nativeElement']._chartjs){
                this.dataService.getDataByPeriod(this.uid, event._value, this.title).then((resp)=>{
                    this.chartService.getChart(resp, event._value, this.title, new Date(), this.monthChart);
                },err=>{
                    this.chartService.getChart(err, event._value, this.title, new Date(), this.monthChart);
                });
            }
        }else if(event._value ==="year"){
            this.dataService.getDataByPeriod(this.uid, "year", this.title).then((resp)=>{
                console.log(resp);
            //     this.returnChart(resp,this.title, new Date(), this.weekChart);
            },err=>{
            //     this.returnChart(err, this.title, new Date(), this.weekChart);
            });
        }
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
        this.chartService.getChart(resp, "week",this.title, new Date(), this.weekChart);
      },err=>{
        this.chartService.getChart(err, "week",this.title, new Date(), this.weekChart);
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
