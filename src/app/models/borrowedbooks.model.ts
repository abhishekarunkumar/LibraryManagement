export interface Borrowedlist {
    id: number;
    title: string;
    isbn: string;
    pageCount: number;
    thumbnailUrl: string;
    status: string;
    authors: string[];
    categories: string[];
    Due_date: Date;
    user_id: number;
}