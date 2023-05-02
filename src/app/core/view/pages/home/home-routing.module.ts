import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewBookComponent} from "./component/view-book/view-book.component";
import {ViewBookCategoryComponent} from "./component/view-book-category/view-book-category.component";
import {MainViewComponent} from "./component/main-view/main-view.component";
import {BookService} from "./service/book.service";
import {BookCategoryService} from "./service/book-category.service";

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent
  },
  {
    path: 'book',
    component: ViewBookComponent,
    resolve: {
      data: BookService
    }
  },
  {
    path: 'book-category',
    component: ViewBookCategoryComponent,
    resolve: {
      data: BookCategoryService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
