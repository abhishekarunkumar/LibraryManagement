import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Loginservice } from 'src/app/service/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Userlist :User[] =[];
  constructor(private log : Loginservice,private route :Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.log.getUser().subscribe(res=>{
      this.Userlist = res;
    })
  }

  userDetailsshow(){
    this.route.navigateByUrl('/user');
  }
}
