import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({ name: 'bookfilter' })
export class BooksFilterPipe implements PipeTransform {
    transform(title : Book[],searchText :string) {
        if(!title || !searchText){
            return title;
        }

        return title.filter(item=>item.title.toLocaleLowerCase().includes(searchText));

    }
}