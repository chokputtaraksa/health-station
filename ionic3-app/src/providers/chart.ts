import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

export class ChartService {
        constructor() {
          
        }


        createChart(result,type, lineCanvas){
                var theme = this.chooseTheme(type);
                return this.createData(result,type, lineCanvas, theme)
        }

        chooseTheme(type){
                var theme;
                if(type==="Bloodpressure"){

                }else if(type==="Heartrate"){

                }else if(type==="Temperature"){

                }else if(type==="Weight"){

                }else if(type==="Height"){

                }
                return theme;
        }

        createData(result, type, lineCanvas, theme){
                if(type === "Bloodpressure"){
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
                                                        }
                                                }]
                                        },legend: {
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