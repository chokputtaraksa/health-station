import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

export class DoughnutChartService {
    constructor() {
        this.regisCustomDonutChart()
    }

    createHalfDonutChart(canvas, data){
        let plot_data = this.getThemeWithData(data)
        var config = {
            type: 'doughnut',
			data: {
				datasets: [{
                    data: [18.50, 4.5, 2, 5, 18],
                    backgroundColor:[
                        "#00FFFF",
                        "#00FF00",
                        "#FFFF00",
                        "#FF6600",
                        "#FF0000",
                    ],
                }],
			},
		    options: {
                rotation : 0.95*Math.PI,
                circumference : 1.1 * Math.PI,
                cutoutPercentage : 45,
			    elements: {
				    center: {
					    text:  "BMI: "+data,
                        color: plot_data['font_color'], // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                },
                legend: {
                    display: false
                },
                tooltips:{
                    enabled : false
                }
            }
        };
        var myChart = new Chart(canvas.nativeElement, config);
    }

    getThemeWithData(data){
        let plot_data={}
        if(data < 18.5){
            plot_data={
                font_color : "#00FFFF"
            }
        }else if(data < 23){
            plot_data={
                font_color : "#00FF00",
            }
        }else if(data < 25){
            plot_data={
                font_color : "#FFFF00"
            }
        }else if(data < 30){
            plot_data={
                font_color : "#FF6600"
            }
        }else{
            plot_data={
                // backgroundColor:[
                //     "rgba(0, 255, 255, 0.4)",
                //     "rgba(0, 255, 0, 0.4)",
                //     "rgba(255, 255, 0, 0.4)",
                //     "rgba(255, 102, 0, 0.4)",
                //     "rgba(255, 0, 0, 0.4)",
                // ],
                font_color : "#FF0000"
            }
        }
        return plot_data
    }

    regisCustomDonutChart(){
        Chart.pluginService.register({
            beforeDraw: function (chart) {
              if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;
                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;
          
                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
          
                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio/1.5);
                var elementHeight = (chart.innerRadius * 2);
          
                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);
          
                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.25);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;
          
                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
              }
            }
          });
    }

}