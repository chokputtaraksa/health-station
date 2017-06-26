import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, PopoverController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
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

    lineChart: any;
    title : string;
 
    constructor(public navCtrl: NavController, public navParams : NavParams, public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController) {
        this.title = this.navParams.get('type');
    }
//  ionViewDidLoad() { //will trigger as soon as the page is loaded
//     console.log("didload");
//         this.showLoader();
 
//         //Check if already authenticated
        // this.authService.checkAuthentication().then((res) => {
        //     console.log("Already authorized");
        //     this.loading.dismiss();
        // }, (err) => {
        //     console.log("Not already authorized");
        //     this.loading.dismiss();
        //     this.navCtrl.setRoot(LoginPage);
        // });
 
//     }   

    showMenu(myEvent){
        let popover = this.popoverCtrl.create(LinkPage);
        popover.present({
            ev: myEvent
        });
    }

    ionViewDidLoad() {
        this.authService.checkAuthentication().then((res) => {
            // console.log("Already authorized");
        }, (err) => {
            console.log("Not already authorized");
            this.navCtrl.setRoot(LoginPage);
        });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
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
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
 
        });
    }

    showMonth(){

    }

    showWeek(){

    }
}
