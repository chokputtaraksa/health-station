import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { ScreenOrientation } from 'ionic-native'
import {Http} from '@angular/http';
import * as io from "socket.io-client";
import 'rxjs/add/operator/map';

@Component({
  selector: 'sensor-page',
  templateUrl: 'sensor-page.html'
})
export class SensorPage implements OnInit{
    messages : any;
    socketHost : any;
    chatBox : any;
    socket : any;
    zone : any;
    hexo_hr: any;
    hexo_br: any;
    fitbit_hr : any;
    hx_timeHr : any;
    hx_timeBr : any;
    fb_timeHr : any;
    hx_timeBHr : any;
    fb_timeBHr : any;
    hx_timeBBr : any;
    constructor(http: Http) {
      this.hx_timeHr = 0;
      this.hx_timeBr = 0;
      this.fb_timeHr = 0;
      this.hx_timeBHr = 0;
      this.hx_timeBBr = 0;
      this.fb_timeBHr = 0;
      this.hexo_hr = "Disconnected";
      this.hexo_br = "Disconnected";
      this.fitbit_hr = "Disconnected";
      this.messages = [];
      this.socketHost = "http://203.151.85.73:3000";
      this.zone = new NgZone({enableLongStackTrace: false});
      this.chatBox = "";
      this.socket = io(this.socketHost);
      
      this.socket.on("heartrate", (msg) => {
        if(msg.tool === "hexoskin"){
          this.hexo_hr = msg.value + " " + "Beats/Min";
        // console.log("Get HR : " + msg.value + " of time : " + msg.date_time + " from server at :" + (new Date()).toISOString());
          this.hx_timeHr++;
          if(this.hx_timeHr >= 100){
            this.hx_timeHr = 0;
          }
        }
        if(msg.tool === "fitbit"){
          this.fitbit_hr = msg.value + " " + "Beats/Min";
        // console.log("Get HR : " + msg.value + " of time : " + msg.date_time + " from server at :" + (new Date()).toISOString());
          this.fb_timeHr++;
          if(this.fb_timeHr >= 100){
            this.fb_timeHr = 0;
          }
        }
      });
      this.socket.on("breartrate", (msg) => {
        this.hexo_br = msg.value + " " + "Breaths/Min";
        // console.log("Get BR : " + msg.value + " of time : " + msg.date_time + " from server at :" + (new Date()).toISOString());
        this.hx_timeBr++;
        if(this.hx_timeBr >= 100){
          this.hx_timeBr = 0;
        }
      });
    }
   
  ngOnInit(){
    setInterval(()=>{
      if(this.hx_timeHr == this.hx_timeBHr){  // check if data is update or not
        this.hexo_hr = "Disconnected"        // if not
      }
      if(this.hx_timeBBr == this.hx_timeBr){
        this.hexo_br = "Disconnected"
      }
      if(this.fb_timeHr == this.fb_timeBHr){
        this.fitbit_hr = "Disconnected"
      }
      this.hx_timeBHr = this.hx_timeHr;
      this.hx_timeBBr = this.hx_timeBr;
      this.fb_timeBHr = this.fb_timeHr;
    }, 10000);
  }
}

 // toggleGroup(group) {
  //    if ($scope.isGroupShown(group)) {
  //      $scope.shownGroup = null;
  //    } else {
  //      $scope.shownGroup = group;
  //    }
  // };
  // isGroupShown(group) {
  //    return $scope.shownGroup === group;
  // };