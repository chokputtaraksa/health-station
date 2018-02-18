import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoughnutChartService } from '../../providers/chart-services/donut-chart'
import { Chart } from 'chart.js';

/**
 * Generated class for the BodyMeasurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-body-measure-page',
    templateUrl: 'body-measure-page.html',
    providers:[DoughnutChartService,]
})
export class BodyMeasurePage {
    @ViewChild('doughnutCanvas') doughnutCanvas;
    my_weight : number;
    my_height : number;
    my_bmi : number;
    weight : number;
    height : number;
    ref_table : Array<{col1:string, col2:string, col3:string}>

    constructor(public navCtrl: NavController, public navParams: NavParams, public chartService: DoughnutChartService) {
        this.my_height = 172;
        this.my_weight = 57;
        this.ref_table = (this.getRefTable());
    }

    ionViewDidLoad() {
        var fake_data = 20;
        console.log(this.doughnutCanvas['nativeElement']['clientHeight']);
        console.log(this.doughnutCanvas['nativeElement']['clientWidth']);
        this.chartService.createHalfDonutChart(this.doughnutCanvas, fake_data)
    }

    createGaugeChart(){

    }

    getRefTable():Array<{col1:string, col2:string, col3:string}>{
        return [
            {
                col1: "น้อยกว่า 18.50",
                col2: "น้ำหนักน้อย / ผอม",
                col3: "มากกว่าคนปกติ"
            },
            {
                col1: "18.50 - 22.90",
                col2: "ปกติ (สุขภาพดี)",
                col3: "เท่าคนปกติ"
            },
            {
                col1: "23 - 24.90",
                col2: "ท้วม / โรคอ้วนระดับ 1",
                col3: "อันตรายระดับ 1"
            },
            {
                col1: "25 - 29.90",
                col2: "อ้วน / โรคอ้วนระดับ 2",
                col3: "อันตรายระดับ 2"
            },
            {
                col1: "มากกว่า 30",
                col2: "อ้วนมาก / โรคอ้วนระดับ 3",
                col3: "อันตรายระดับ 3"
            },
            
        ]
    }

}
