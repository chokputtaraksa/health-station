/// <reference path="../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from './auth'
import { Config } from '../config';
import 'rxjs/add/operator/map';
 
@Injectable()
export class UserController {
  constructor(public http: Http, public storage: Storage, public authService: Auth) {

  }
 
  saveProfile(storage_profile, db_save_profile){
    console.log(db_save_profile);
    if(Object.keys(db_save_profile).length > 0&&(typeof  db_save_profile) ==='object'){
      let contents = {
          bloodtype: db_save_profile.bloodtype,
          drugallergy : db_save_profile.drugallergy,
          disease : db_save_profile.disease,
          email : db_save_profile.email,
          phone : db_save_profile.phone,
          address2 : db_save_profile.address2,
          address_allow : db_save_profile.address_allow
      }
      console.log(contents);
      this.storage.set('profile', storage_profile);
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        headers.append('_id', this.authService.profile['_id']);
        this.http.put(Config.AUTH_SERVER+'/api/user/updateprofile', JSON.stringify(contents), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            resolve(data);
          }, (err) => {
            console.log(err);
          });
        });
    }
  }
 
}