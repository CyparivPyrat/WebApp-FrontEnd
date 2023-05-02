import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {BookCategoryService} from "../../service/book-category.service";
import {AddNewBookCategoryComponent} from "../add-new-book-category/add-new-book-category.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteBookCategoryComponent} from "../delete-book-category/delete-book-category.component";

@Component({
  selector: 'app-view-book-category',
  templateUrl: './view-book-category.component.html',
  styleUrls: ['./view-book-category.component.scss']
})
export class ViewBookCategoryComponent {

  onGetAllBookCategoriesSubs = new Subscription();

  displayedColumns: string[] = [
    'subCategory',
    'description',
    'actions'];

  dataSource = [];

  constructor(private bookCategoryService: BookCategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onGetAllBookCategoriesSubs = this.bookCategoryService.onGetAllBookCategories
      .subscribe((data: any) => {
        if (data) {
          this.dataSource = [];
          data.result.forEach((val: object) => {
            // @ts-ignore
            this.dataSource.push(val);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.onGetAllBookCategoriesSubs.unsubscribe();
  }

  view($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddNewBookCategoryComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `View Book Category`,
          type: 'VIEW',
          bookCategory: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookCategoryService.getAllBookCategories();
        }
        dialogSubs.unsubscribe();
      });
  }

  edit($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddNewBookCategoryComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Edit Book Category`,
          type: 'EDIT',
          bookCategory: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookCategoryService.getAllBookCategories();
        }
        dialogSubs.unsubscribe();
      });
  }

  delete($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(DeleteBookCategoryComponent, {
        panelClass: 'custom-dialog-panel',
        width: '40%',
        data: {
          title: `Delete Book Category`,
          itemData: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookCategoryService.getAllBookCategories();
        }
        dialogSubs.unsubscribe();
      });
  }

  addBookCategory(param: any) {
    const dialogRef = this.dialog.open(AddNewBookCategoryComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Add Book Category`,
          type: 'ADD',
          user: param
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookCategoryService.getAllBookCategories();
        }
        dialogSubs.unsubscribe();
      });
  }
}
