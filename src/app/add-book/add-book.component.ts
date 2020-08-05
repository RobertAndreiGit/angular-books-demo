import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-add-book',
	templateUrl: './add-book.component.html',
	styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
	booksForm: FormGroup;
	name = '';
	author = '';
	year: number = 0;
	description = '';
	isLoadingResults = false;
	matcher = new ErrorStateMatcher();

	constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.booksForm = this.formBuilder.group({
			name: [null, Validators.required],
			author: [null, Validators.required],
			year: [null, Validators.required],
			description: [null, Validators.required]
		});
	}

	onFormSubmit() {
		this.isLoadingResults = true;
		this.api.addBook(this.booksForm.value).subscribe(
			(res: any) => {
				this.isLoadingResults = false;
				this.router.navigate(['/']);
			},
			(err: any) => {
				console.log(err);
				this.isLoadingResults = false;
			}
		);
	}
}
