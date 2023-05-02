import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from "../../../../shared/shared.module";
import {ViewBookComponent} from './component/view-book/view-book.component';
import {ViewBookCategoryComponent} from './component/view-book-category/view-book-category.component';
import {MainViewComponent} from './component/main-view/main-view.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BookService} from "./service/book.service";
import {BookCategoryService} from "./service/book-category.service";
import {AddNewBookCategoryComponent} from './component/add-new-book-category/add-new-book-category.component';
import {DeleteBookComponent} from './component/delete-book/delete-book.component';
import {DeleteBookCategoryComponent} from './component/delete-book-category/delete-book-category.component';
import {AddNewBookComponent} from './component/add-new-book/add-new-book.component';
import {DateService} from "./service/date.service";

@NgModule({
  declarations: [
    ViewBookComponent,
    ViewBookCategoryComponent,
    MainViewComponent,
    AddNewBookCategoryComponent,
    DeleteBookComponent,
    DeleteBookCategoryComponent,
    AddNewBookComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    BookService,
    BookCategoryService,
    DateService
  ]
})
export class HomeModule {
}
