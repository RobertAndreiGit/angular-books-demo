import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from './../Book';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
	displayedColumns: string[] = ['name', 'author', 'year', 'delete', 'edit'];
	data = new MatTableDataSource<Book>([]);
	isLoadingResults = true;

	constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

	ngOnInit(): void {
		this.api.getBooks().subscribe(
			(res: any) => {
				this.data.data = res;
				console.log(this.data);
				this.isLoadingResults = false;
			},
			(err) => {
				console.log(err);
				this.isLoadingResults = false;
			}
		);
	}

	deleteBook(id: any) {
		this.isLoadingResults = true;
		this.api.deleteBook(id)
			.subscribe(res => {
				this.isLoadingResults = false;
				this.ngOnInit();
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			}
			);
	}

	editBook(id: any) {
		this.router.navigate([`/edit-book/${id}`]);
	}
}
