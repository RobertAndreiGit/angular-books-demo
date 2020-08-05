import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  _id = '';
  name = '';
  author = '';
  year: number = 0;
  description = '';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBookById(this.route.snapshot.params.id);
    this.bookForm = this.formBuilder.group({
      name: [null, Validators.required],
      author: [null, Validators.required],
      year: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  getBookById(id: any) {
    this.api.getBookById(id).subscribe((data: any) => {
      this._id = data._id;
      this.bookForm.setValue({
        name: data.name,
        author: data.author,
        year: data.year,
        description: data.description
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateBook(this._id, this.bookForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}
