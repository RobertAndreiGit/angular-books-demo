import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
	{
		path: '',
		component: BooksComponent,
		data: { title: 'Books' }
	},
	{
		path: 'add-book',
		component: AddBookComponent,
		data: { title: 'Add Book' }
	},
	{
		path: 'edit-book/:id',
		component: EditBookComponent,
		data: { title: 'Edit Book' }
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
