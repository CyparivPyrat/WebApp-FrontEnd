import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Subscription} from "rxjs";
import {AddNewBookCategoryComponent} from "../add-new-book-category/add-new-book-category.component";
import {BookCategoryService} from "../../service/book-category.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewBookComponent} from "../add-new-book/add-new-book.component";
import {DeleteBookCategoryComponent} from "../delete-book-category/delete-book-category.component";
import {DeleteBookComponent} from "../delete-book/delete-book.component";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit, OnDestroy {

  onGetAllBooksSubs = new Subscription();

  displayedColumns: string[] = [
    'subCategory',
    'title',
    'author',
    'noOfCopies',
    'language',
    'publicationDateStr',
    'actions'];

  dataSource = [];

  constructor(private bookService: BookService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onGetAllBooksSubs = this.bookService.onGetAllBooks
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
    this.onGetAllBooksSubs.unsubscribe();
  }

  addBook(param: any) {
    const dialogRef = this.dialog.open(AddNewBookComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Add Book`,
          type: 'ADD',
          user: param
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookService.getAllBooks();
        }
        dialogSubs.unsubscribe();
      });
  }

  view($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddNewBookComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `View Book`,
          type: 'VIEW',
          book: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookService.getAllBooks();
        }
        dialogSubs.unsubscribe();
      });
  }

  edit($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddNewBookComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Edit Book`,
          type: 'EDIT',
          book: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookService.getAllBooks();
        }
        dialogSubs.unsubscribe();
      });
  }

  delete($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
        panelClass: 'custom-dialog-panel',
        width: '40%',
        data: {
          title: `Delete Book`,
          itemData: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.bookService.getAllBooks();
        }
        dialogSubs.unsubscribe();
      });
  }
}
