import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController} from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Auth } from '../../providers/auth';
import { Config } from '../../config';
import { Chart } from 'chart.js';
import { LinkPage } from '../link-page/link-page';
import { LoginPage } from '../login-page/login-page';

/**
 * Generated class for the SummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-summary-page',
  templateUrl: 'summary-page.html',
})
export class SummaryPage {

    @ViewChild('lineCanvas') lineCanvas;

    uid : string;
    lineChart: any;
    title : string;
    period : string;
    mode : string;
    description : any;
    todayData : any;
    date_string : string;
    label : object;
    

 
    constructor(public http : Http, public navCtrl: NavController, public navParams : NavParams, public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController) {
        this.title = this.navParams.get('type');
        this.period = "Week";
        this.mode = "today"
        this.label = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }

    ionViewDidLoad() {
        this.authService.checkAuthentication().then((res) => {
            this.authService.getUserInfo().then(resp => {
                // console.log(resp);
                this.uid = resp['uid']
                this.getData(resp['uid'], this.navParams.get('type')).then(response=>{
                    if(response){
                        this.todayData = response;
                        this.date_string = this.isTheSameDate(response['effective_time_frame']['date_time']);
                    }
                });
            });

        }, (err) => {
            console.log("Not already authorized");
            this.navCtrl.setRoot(LoginPage);
        });
        this.createChart();
    }

    createChart(){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: this.label,
                datasets: [
                    {
                        label: "Your "+ this.title + " in this " + this.period,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [165, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                        
                    }
                ]
            },
            options: {
                scales:
                {
                    yAxes: [{
                        gridLines : {
                            display : false,
                            drawBorder: false,
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    xAxes:[{
                        gridLines:{
                            display : false
                        }
                    }]
                }
            }
 
        });
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
        // console.log(now);
        var data_date = new Date(input);
        // console.log(data);
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

    getAMorPMTime(input : Date){
        // console.log(input);
        var hours = input.getHours();
        // console.log(hours);
        var mid='AM';
        if(hours==0){ //At 00 hours we need to show 12 am
            hours=12;
        }else if(hours>12){
            hours=hours%12;
            mid='PM';
        }
        return hours + ":" + input.getMinutes() + " " + mid;
    }


    getData(uid, type){
 
        return new Promise((resolve, reject) => {
 
            let headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            headers.append('user_id', uid);
            headers.append('type' ,  type);
            // headers.append('authorization', 'Basic ' + new Buffer(credentials.email + ':' + credentials.password).toString('base64'));
            this.http.get(Config.AUTH_SERVER+'/api/data/latest',  {headers: headers})
                .subscribe(res => {
                // console.log(res);
                    resolve(res.json());
                }, (err) => {
                    reject(err);
            });
        });
    }

    changePeriod(period){
        this.period = period;
        if(this.period === "Week"){
            this.label = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        }else{
            for(var i=1; i<=this.getDateInMonth(new Date().getUTCDate(), new Date().getMonth()); i++){
                this.label[i-1] = i;
            }
        }
        console.log("change period");
        this.createChart();
    }

    changeMode(mode){
        this.mode = mode;
        if(mode == "desc"){
            this.description = this.getDescription(this.title);
        }
    }

    showMenu(myEvent){
        let popover = this.popoverCtrl.create(LinkPage);
        popover.present({
            ev: myEvent
        });
    }

    getDateInMonth(year ,month){
      return new Date(year, month, 0).getDate();
    }
}
