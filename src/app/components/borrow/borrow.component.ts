import { Component, OnInit } from '@angular/core';
import { Borrowedlist } from 'src/app/models/borrowedbooks.model';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  borrowlist :Borrowedlist[]=[];
  display :string = "none";
  msg  = "";
  constructor(private data :DashboardService) { }

  ngOnInit(): void {
    this.get_borrwed_books();
  }

  get_borrwed_books(){
    try{
        this.data.get_borrowedbooks().subscribe(books=>{
          this.borrowlist = books;
        })
    }
    catch{
      console.log("Data not found");
    }
  }

  Retrun_book(data:Borrowedlist) {
    this.display = "block";
    let d_date = data.Due_date;
    let curr_date = new Date().getDate();
    let due_date = new Date(d_date).getDate();
        if(data.status == "Over Due" && (curr_date - due_date)==3){
          this.msg =  "Pay fine amount of INR 20";
        }
        else if(data.status == "Over Due" && (curr_date - due_date)>3){
          this.msg =  "Pay fine amount of INR 50";
        }
        else{
          this.msg = "No Due";
        }
        return this.msg;
  }

   
    
    
    
 
  
  

  onCloseHandled(){
    this.display="none";
  }

}
