import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './Book';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:4201/book';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) { }

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		};
	}

	getBooks(): Observable<Book[]> {
		return this.http
			.get<Book[]>(`${apiUrl}`)
			.pipe(tap((Book) => console.log('fetched book')), catchError(this.handleError('getBook', [])));
	}

	getBookById(id: string): Observable<Book> {
		const url = `${apiUrl}/${id}`;
		return this.http.get<Book>(url).pipe(
			tap(_ => console.log(`fetched book id=${id}`)),
			catchError(this.handleError<Book>(`getBookById id=${id}`))
		);
	}

	addBook(Book: Book): Observable<Book> {
		return this.http
			.post<Book>(apiUrl, Book, httpOptions)
			.pipe(
				tap((book: Book) => console.log(`added book ${book._id}`)),
				catchError(this.handleError<Book>('addBook'))
			);
	}

	updateBook(id: string, Book: Book): Observable<any> {
		const url = `${apiUrl}/${id}`;
		return this.http
			.put(url, Book, httpOptions)
			.pipe(tap((_) => console.log(`updated book ${id}`)), catchError(this.handleError<any>('updateBook')));
	}

	deleteBook(id: string): Observable<Book> {
		const url = `${apiUrl}/${id}`;
		return this.http
			.delete<Book>(url, httpOptions)
			.pipe(tap((_) => console.log(`deleted book ${id}`)), catchError(this.handleError<Book>('deleteBook')));
	}
}
