import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardserviceService {

  constructor() { }

  gettoken(){  
    return !!localStorage.getItem("SessionUser");  
  }  
 
}
