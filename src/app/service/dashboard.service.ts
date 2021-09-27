import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Book } from "../models/book.model";
import { Borrowedlist } from "../models/borrowedbooks.model";


@Injectable({
    providedIn:'root'
})

export class DashboardService {
 
    private booksurl = 'http://localhost:3000/books';
    private borrowbooksurl = 'http://localhost:3000/borrowedlist';

    constructor(private _http : HttpClient){
    }

    getBooks():Observable<Book[]>{
        return this._http.get<Book[]>(this.booksurl);
    }

    borrow_Books(book_borrowed:Borrowedlist[]){
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(book_borrowed);
        return this._http.post<Borrowedlist[]>(this.borrowbooksurl + 'borrowlist', body,{'headers':headers})
        //this._http.post<Borrowedlist[]>(this.borrowbooksurl,data);
        console.log(book_borrowed);
    }

   
    get_borrowedbooks():Observable<Borrowedlist[]>{
        return this._http.get<Borrowedlist[]>(this.borrowbooksurl);
    }
    
    
}

