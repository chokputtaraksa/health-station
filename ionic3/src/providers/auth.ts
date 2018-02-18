/// <reference path="../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Config } from '../config';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Auth {
  public token: any;
  public profile:object;
  public credential:object;
  constructor(public http: Http, public storage: Storage) {
    this.storage.get('profile').then((value) => {  
      this.profile = value;
    });
    this.storage.get('credential').then((value) => {  
      this.credential = value;
    });
  }
 
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
            this.token = value;
            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(Config.AUTH_SERVER+'/api/auth/protected', {headers: headers})
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        // headers.append('authorization', 'Basic ' + new Buffer(details.email + ':' + details.password).toString('base64'));
        headers.append('Content-Type', 'application/json');
 
        this.http.post(Config.AUTH_SERVER+'/api/auth/register', JSON.stringify(details.profile), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token;
            this.profile = data.user;
            this.storage.set('token', data.token);
            this.storage.set('profile', data.user);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Basic ' + new Buffer(credentials.username + ':' + credentials.password).toString('base64'));
        // headers.append('authorization', 'Basic ' + new Buffer(credentials.email + ':' + credentials.password).toString('base64'));
        this.http.get(Config.AUTH_SERVER+'/api/auth/login',  {headers: headers})
          .subscribe(res => {
            
            let data = res.json();
            this.token = data.token;
            this.profile = data.user;
            this.storage.set('token', data.token);
            this.storage.set('profile', data.user);
            resolve(data);
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
    this.token = '';
  }

  firsttime_change(details){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        // headers.append('authorization', 'Basic ' + new Buffer(details.email + ':' + details.password).toString('base64'));
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        headers.append('_id', this.profile['_id']);
        this.http.put(Config.AUTH_SERVER+'/api/auth/firsttimeupdate', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }

  saveUsernamePassword(username, password){
    let credential = {
      username : username,
      password : password
    }
    this.credential = credential;
    this.storage.set('credential', credential);
  }
}