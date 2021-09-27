import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/service/dashboard.service';
import { Router, RouterModule } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Borrowedlist } from 'src/app/models/borrowedbooks.model';
import { Loginservice } from 'src/app/service/login.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  booklist :Book[]=[];
  borrowlist:Borrowedlist[]=[];
  isBorrow:boolean = true;
  userData : User[] = [];
  userName :string = "";
  isAdmin = false;
  display :string = "none";

  constructor(private _dash :DashboardService,private route :Router,private _log :Loginservice) { }

  ngOnInit(): void {
    this.getBooksList();
    this.get_User();
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  getBooksList(){
    try{
        this._dash.getBooks().subscribe(res=>{
          this.booklist = res;
        })
    }
    catch{
      console.log("Data not found");
    }
  }

  get_User(){
    try{
        this._log.getUser().subscribe(user=>{
          this.userData = user;
          this.userName = this.userData[0].name;
        })
    }
    catch{
      console.log("Data not found");
    }
  }

  addToBorrow(val:any){
    if(val!=undefined || val!=0)
    {
      this.isBorrow = false;
      this.borrowlist.push(val);
    }
    else{
      this.isBorrow = true;
    }
        
  }

  _borrow(){
    if(this.borrowlist.length > 3 ){
      alert("You cannot borrow more than 3 books");
    }
    else{
      this._dash.borrow_Books(this.borrowlist);
      this.route.navigateByUrl('/borrow');
    }
    
  }
 
  calculate_Due_Date(){
    let currDate =  new Date();
    let dueDate = new Date(currDate);
    dueDate.setDate(dueDate.getDate()+ 14);
    return dueDate; 
  }

  redirect_Dashboard(){
    this.route.navigateByUrl('/dashboard');
  }

  manageBooks(){
    this.display="block";
    
  }
  
}



