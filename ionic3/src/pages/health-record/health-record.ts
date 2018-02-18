import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HealthRecordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-health-record',
  templateUrl: 'health-record.html',
})
export class HealthRecordPage {
  health_records : Array<{type: string, date_time: string}>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.health_records = [
      {type:"Hearth rate: 56", date_time: (new Date("2018-1-23")).toDateString()},
      {type:"Height: 172", date_time: (new Date("2018-1-23")).toDateString()},
      {type:"Weight: 63", date_time: (new Date("2018-1-23")).toDateString()},
      {type:"Temperature: 37", date_time: (new Date("2018-1-23")).toDateString()},
      {type:"Weight: 62", date_time: (new Date("2018-1-24")).toDateString()},
      {type:"Weight: 63", date_time: (new Date("2018-1-25")).toDateString()},
      {type:"Weight: 64", date_time: (new Date("2018-1-26")).toDateString()},
    ]
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HealthRecordPage');
  }

}
