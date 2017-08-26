import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

export class ChartService {
        constructor() {
          
        }


        // createChart(result,type, lineCanvas){
        //         var theme = this.chooseTheme(type);
        //         return this.createData(result, type, lineCanvas, theme)
        // }

        private chooseTheme(type){
                var theme;
                if(type==="Bloodpressure"){

                }else if(type==="Heartrate"){

                }else if(type==="Temperature"){

                }else if(type==="Weight"){

                }else if(type==="Height"){

                }
                return theme;
        }

        getChart(raw_data, period, type, todayDate,lineCanvas){
                if(period === "week"){
                        this.getWeekChartData(raw_data, type, todayDate).then(result=>{ // look at prepareDataForChart
                                console.log(result)
                                return this.createChart(result, period, type, lineCanvas,this.chooseTheme(type));
                        },err=>{
                                return this.createChart(err, period, type, lineCanvas,this.chooseTheme(type)); // make zero chart
                        });
                }
                if(period ==="month"){
                        this.getMonthChartData(raw_data, type, todayDate).then(result=>{ // look at prepareDataForChart
                                return this.createChart(result, period, type, lineCanvas, this.chooseTheme(type));
                        },err=>{
                                return this.createChart(err, period, type, lineCanvas,this.chooseTheme(type)); // make zero chart
                        });
                }
                if(period ==="year"){

                }
        }
          
              
        getWeekChartData(resp, type, todayDate:Date){
                var data_l = [];
                var data_h = [];
                var label = [];
                return new Promise((resolve,reject)=>{
                        var start = new Date(todayDate);
                        start.setDate(start.getDate()-start.getDay());
                        start.setHours(0);
                        start.setMinutes(0);
                        var end = new Date(todayDate);
                        end.setDate(end.getDate()+ (6-end.getDay()));
                        end.setHours(0);
                        end.setMinutes(0);
                        var index = 0;
                        this.arrangeData(resp, type).then(result=>{
                                for(var i=start.getDay(); i<=end.getDay(); i++){
                                        for(var j=1; j<=Object.keys(result).length; j++){
                                                if(result[j-1].date.getDay() == i){
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
                                        label[index++] = new Date(todayDate.getFullYear(), todayDate.getMonth(), k)
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
                                        label[index++] = new Date(todayDate.getFullYear(), todayDate.getMonth(), i)
                                }
                                reject({data_l: data_l, data_h: data_h, label:label});
                        });
                });
        }

        getMonthChartData(resp, type, todayDate){
                var data_l = [];
                var data_h = [];
                var label = [];
              return new Promise((resolve,reject)=>{
                  this.arrangeData(resp, type).then(result=>{
                    for(var i=1; i<=this.getDateInMonth(result[0].date); i++){
                      for(var j=1; j<=Object.keys(result).length; j++){
                        if(result[j-1].date.getDate() == i){
                          if(type == "Bloodpressure"){
                            data_l[i-1] = result[j-1].value_l;
                            data_h[i-1] = result[j-1].value_h;
                          }else{
                            data_l[i-1] = result[j-1].value;
                          }
                        }// can not use else here I don't know why but 0 will replace the real value
                      } // so I use new for loop to check if empty put 0 there
                    }
                    for(var i=1; i<=this.getDateInMonth(result[0].date); i++){
                      if(!data_l[i-1]){
                        data_l[i-1]=0;
                      }
                      if(!data_h[i-1]){
                        data_h[i-1]=0;
                      }
                      label[i-1] = moment([todayDate.getFullYear(), todayDate.getMonth(), i])
                    }
                    resolve({data_l: data_l, data_h: data_h, label:label});
                  },err=>{
                    for(var i=1; i<=this.getDateInMonth(new Date(todayDate.getFullYear(), todayDate.getMonth())); i++){
                      if(!data_l[i-1]){
                        data_l[i-1]=0;
                      }
                      if(!data_h[i-1]){
                        data_h[i-1]=0;
                      }
                      label[i-1] = moment([todayDate.getFullYear(), todayDate.getMonth(), i])
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

        private createChart(result, period, type, lineCanvas, theme){
                let date_format:string;
                if(period === 'week'){
                        date_format = "day";
                }else if(period === 'month'){
                        date_format = "week";
                }else if(period === 'year'){
                        date_format = "month";
                }
                if(type === "Bloodpressure"){
                        return new Chart(lineCanvas.nativeElement, {
                                type: 'bar',
                                data: {
                                        // labels: result['label'],
                                        datasets: [
                                        {
                                                label: type + " :",
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
                                                data: result['data_l'],
                                                spanGaps: false,
                                        },
                                        {
                                                label: type + " :",
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
                                                data: result['data_h'],
                                                spanGaps: false,
                                        },
                                        {
                                                label: type + " :",
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
                                                data: result['data_l'],
                                                spanGaps: false,
                                                type: 'line',
                                        },
                                        {
                                                label: type + " :",
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
                                                data: result['data_h'],
                                                spanGaps: false,
                                                type: 'line',
                                        },
                                ]
                                },
                                options: {
                                        scales:{
                                                yAxes: [{
                                                        gridLines : {
                                                        display : false,
                                                        drawBorder: false,
                                                        },
                                                        ticks: {
                                                        beginAtZero: true,
                                                        display: false
                                                        }
                                                }],
                                                xAxes:[{
                                                        gridLines:{
                                                                display : false
                                                        },
                                                        type: 'time',
                                                        time: {
                                                                unit : date_format,
                                                                displayFormats: {
                                                                        month: "MMM YY",
                                                                        week: "DD MMM",
                                                                        day : "ddd DD"
                                                                }
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                        }
                                                }]
                                        },
                                        legend: {
                                                display: false
                                        },
                                        tooltips: {
                                                callbacks: {
                                                label: function(tooltipItem) {
                                                        return tooltipItem.yLabel;
                                                }
                                                }
                                        }
                                }
                
                        });
                }else{
                        return new Chart(lineCanvas.nativeElement, {
                                type: 'bar',
                                data: {
                                        labels: result['label'],
                                        datasets: [
                                        {
                                                label: type + " :",
                                                fill: false,
                                                lineTension: 0.1,
                                                backgroundColor: "rgba(75,192,192,0.4)",
                                                borderColor: "rgba(75,192,192,1)",
                                                borderCapStyle: 'butt',
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
                                                data: result['data_l'],
                                                spanGaps: false,
                                        },
                                        {
                                                label: type + " :",
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
                                                data: result['data_l'],
                                                spanGaps: false,
                                                type: 'line',
                                        }
                                ]
                                },
                                options: {
                                        scales:{
                                                yAxes: [{
                                                        gridLines : {
                                                        display : false,
                                                        drawBorder: false,
                                                        },
                                                        ticks: {
                                                        beginAtZero: true,
                                                        display: false
                                                        }
                                                }],
                                                xAxes:[{
                                                        gridLines:{
                                                                display : false
                                                        },
                                                        type: 'time',
                                                        time: {
                                                                unit : date_format,
                                                                displayFormats: {
                                                                        month: "MMM YY",
                                                                        week: "DD MMM",
                                                                        day : "ddd DD"
                                                                }
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                        }
                                                }]
                                        },
                                        legend: {
                                                display: false
                                        },
                                        tooltips: {
                                                callbacks: {
                                                label: function(tooltipItem) {
                                                        return tooltipItem.yLabel;
                                                }
                                                }
                                        }
                                }
                
                        });
                }
        }
}