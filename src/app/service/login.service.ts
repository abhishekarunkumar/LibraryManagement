import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "../models/user.model";
import { Admin } from "../models/admin.model";

@Injectable({
    providedIn:'root'
})

export class Loginservice {
    static getUser() {
      throw new Error('Method not implemented.');
    }
    private loginurl = 'http://localhost:3000/users';
    private loginurl_admin = 'http://localhost:3000/Admin';

    constructor(private _http : HttpClient){
    }

    getUser():Observable<User[]>{
        return this._http.get<User[]>(this.loginurl);
    }


    get_Admin():Observable<Admin[]>{
        return this._http.get<Admin[]>(this.loginurl_admin);
    }

}

