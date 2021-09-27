import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginservice } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submitted = false;
  Admin :any=[];

  form = new FormGroup({
    password: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email])
  })

  constructor(private log : Loginservice, private route :Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }


  login_Admin(){
    try
    {
      this.submitted=true;

      if(this.form.invalid){
        return;
      }

      this.log.get_Admin().subscribe(res=>{
      const admin = res.find((a:any)=>{
        localStorage.clear();
        return a.admin_email === this.form.value.email && a.admin_pass === this.form.value.password;
      });
      this.Admin = admin;
      localStorage.setItem('SessionUser',this.Admin);
      if(admin){
        this.form.reset();
        localStorage.setItem('isAdmin','true');
        this.route.navigate(['dashboard']);
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
