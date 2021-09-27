import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Loginservice } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  User:any = [];

  form = new FormGroup({
    password: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email])
  })

  constructor(private log : Loginservice, private route :Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }


  login()
  {
    try
    {
      this.submitted=true;

      if(this.form.invalid){
        return;
      }

      this.log.getUser().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.uemail === this.form.value.email && a.upass === this.form.value.password;
      });
      this.User = user;
      localStorage.setItem('SessionUser',this.User);
      if(user){
        this.form.reset();
        localStorage.setItem('isAdmin','false');
        this.route.navigateByUrl('/dashboard');
      }
      else{
        alert("User not fouund");
      }
    });
    }
    catch{
      alert("Something is Wrong!");
    }
  }
  
}
