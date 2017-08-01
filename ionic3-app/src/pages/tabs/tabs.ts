import { Component } from '@angular/core';
import { NavParams,PopoverController} from 'ionic-angular';

import { SumWeekPage } from '../sum-week-page/sum-week-page';
import { SumMonthPage } from '../sum-month-page/sum-month-page';
import { LinkPage } from '../link-page/link-page'

 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  param : object;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SumWeekPage;
  tab2Root: any = SumMonthPage;
  // tab2Root: any = SensorPage;
  // tab3Root: any = HistoryPage;
 
  constructor(public navParams:NavParams, public popoverCtrl: PopoverController) {
    this.param = {type:this.navParams.get('type')};
  }

  showMenu(myEvent){
        let popover = this.popoverCtrl.create(LinkPage);
        popover.present({
            ev: myEvent
        });
    }

  
}