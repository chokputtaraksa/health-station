/// <reference path="../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from '../config';
import 'rxjs/add/operator/map';
 
@Injectable()
export class DataService {
  public token: any;
  constructor(public http: Http, public storage: Storage) {
    
  }

  getLatestDataByType(uid, type){
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
  
  getAllLatestData(uid){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('user_id', uid);
        // headers.append('authorization', 'Basic ' + new Buffer(credentials.email + ':' + credentials.password).toString('base64'));
        this.http.get(Config.AUTH_SERVER+'/api/data/allLestest',  {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
  }

  getDataByPeriod(uid,period,type){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('user_id', uid);
        headers.append("type", type);
        headers.append('period', period);

        // headers.append('authorization', 'Basic ' + new Buffer(credentials.email + ':' + credentials.password).toString('base64'));
        this.http.get(Config.AUTH_SERVER+'/api/data/period',  {headers: headers})
          .subscribe(res => {
            // console.log(res);
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
  }
 
}