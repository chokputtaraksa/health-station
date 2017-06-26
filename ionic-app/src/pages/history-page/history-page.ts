/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, NgZone } from '@angular/core';
// import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client'

@IonicPage()
@Component({
  selector: 'page-history-page',
  templateUrl: 'history-page.html',
})

export class HistoryPage {
  selectedType : string;
  selectedTool : string;
  fromDate : string;
  fromTime : string;
  toDate : string;
  toTime : string;
  http : any;
  arrayHr : any;
  arrayBr : any;
  
  constructor(http: Http) {
    this.selectedType = 'anyType';
    this.selectedTool = 'anyTool';
    var now = new Date();
    now.setHours(now.getHours() + 7);//set to localtime
    this.fromDate = now.toISOString().substr(0,10);
    this.fromTime = now.toISOString().substr(11,8);
    this.toDate = now.toISOString().substr(0,10);
    this.toTime = this.fromTime;
    this.http = http;
  }
  getHistory(){
    // console.log(this.selectedType + " : " + this.selectedTool + " : " + this.fromDate + " : " + this.fromTime);
    var options = {
      uid : 1111,
      type : this.selectedType,
      tool : this.selectedTool,
      from : this.fromDate+"T"+this.fromTime+"Z",
      to : this.toDate+"T"+this.toTime+"Z"
    }
    console.log(options);
    this.http.post('http://203.151.85.73:3000/api/db/findDataDocuments', options).subscribe(data => {
      // console.log(typeof data._body);
      var body = data._body ;
      if(body === "[]"){
        this.arrayHr = [];
        this.arrayBr = [];
      }else{
        body = JSON.parse(body);
        if(body.HR){
          this.arrayHr=body.HR;
        }
        if(body.BR){
          this.arrayBr=body.BR;
        }
        console.log(this.arrayHr);
        // console.log(this.arrayBr);
      }
    });
  }

  ngOnDestroy(){
    this.arrayBr = [];
    this.arrayHr = [];
  }

  getTime(date_time){
    // console.log(date_time.substr(11,9));
    // var time = new Date(date_time.substr(0,10));
    // var oneduenpee = time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear();
    var hour = +(date_time.substr(11,2));
    return  (hour) + date_time.substr(13,6);
  }

  

  // getHistory(msg) {
  //   if(msg && msg != "") {
  //     this.socket.emit("my_event", msg);
  //   }
  //   this.chatBox = "";
  // }
}

